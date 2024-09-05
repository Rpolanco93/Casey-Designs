from flask import jsonify, request
from flask_login import current_user, login_required
from app.models import Product, ProductImage, db, ProductReview
from sqlalchemy.orm import joinedload
from app.api.helper import make_dict, review_dict
from app.forms import ProductForm, ReviewForm
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

'''Post a new review for a product by product id'''

@product_routes.route('/<int:product_id>/reviews', methoda=['POST'])
@login_required
def submit_product_review(product_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = ProductReview(
            product_id,
            review= form.data['review'],
            stars = form.data['stars'],
            user_id = current_user.id
        )
        db.session.add(review)
        db.session.commit()

        return jsonify({'review_id': review.id}), 201
    return jsonify(form.errors), 400

@product_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def submit_product_image(product_id):
    #need to review how to implement aws
    pass
