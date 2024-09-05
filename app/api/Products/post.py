from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Product, ProductImage, db, ProductReview
from sqlalchemy.orm import joinedload
from app.api.helper import make_dict, review_dict
from app.forms import ProductForm
from . import product_routes

'''create a new product'''

@product_routes.route('', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            seller_id= current_user.id,
            name = form.data['name'],
            price = form.data['price'],
            description= form.data['description']
        )
        db.session.add(product)
        db.session.commit()

        return jsonify(make_dict(product)), 201
    return jsonify(form.errors), 400
