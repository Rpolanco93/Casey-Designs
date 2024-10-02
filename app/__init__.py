import json
import os
from sys import api_version

from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from sqlalchemy import text

from .api import (
    user_routes,
    auth_routes,
    product_routes,
    product_post,
    product_delete,
    product_put,
    cart_get_items
)
from .config import Config
from .models import db, SCHEMA, User
from .seeds import seed_commands

stripe = (os.environ.get('STRIPE_SECRET_KEY'), {
    api_version: "2022-08-01"
})

# Create Flask application
app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

# Configure Flask
app.config.from_object(Config)

# Initialize database
db.init_app(app)
Migrate(app, db)

# Add seed commands
app.cli.add_command(seed_commands)

# Configure login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

# Application Security
CORS(app)

# Add route blueprints
# app.register_blueprint(stripe_routes)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(product_routes, url_prefix='/api/products')
app.register_blueprint(product_post, url_prefix='/api/products')
app.register_blueprint(product_delete, url_prefix='/api/products')
app.register_blueprint(product_put, url_prefix='/api/products')
app.register_blueprint(cart_get_items, url_prefix='/api/cart')

# Before any request is made, set the search path so that direct queries will look in the
# right place for database objects.
@app.before_request
def set_search_path():
    db.session.execute(text(f"SET search_path TO {SCHEMA}"))

@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Since we are deploying with Docker and Flask,
# we won't be using a build-pack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)



@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = {rule.rule: [[method for method in rule.methods if method in acceptable_methods],
                              app.view_functions[rule.endpoint].__doc__]
                  for rule in app.url_map.iter_rules() if rule.endpoint != 'static'}
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

# stripe config route
@app.route("/api/config")
def stipe_config():
    return {
        'publishableKey': os.environ.get('STRIPE_PUBLISHABLE_KEY')
    }

# stripe
def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400

# Stripe payment intent
@app.route("/api/create-payment-intent")
def stripe_payment_intent():
    try:
        data = json.loads(request.data)
        # Create a payment intent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            currency = "usd",
            amount = calculate_order_amount(data['items']),
            automatic_payment_methods= { 'enabled': True },
        )

        # Send publishable key and PaymentIntent details to client
        return jsonify({
                'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return {'error': {
            'message': e.message,
        }}


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
