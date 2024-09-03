from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product, ProductImage, db, ProductReview
from sqlalchemy.orm import joinedload
from app.api.helper import make_dict

product_get = Blueprint('product-get', __name__)

'''GET ALL PRODUCTS '''

@product_get.route('', methods=['GET'])
def get_all_products():
    try:
        products = Product.query.options(joinedload(Product.product_images))
        products_data = [make_dict(product) for product in products]
        return jsonify(products_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''GET PRODUCT BY ID'''

@product_get.route('<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        product = Product.query.options(joinedload(Product.product_images)).get_or_404(product_id)
        product_data = make_dict(product)
        return jsonify(product_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''GET CURRENT USERS PRODUCTS'''

@product_get.route('current', methods=['GET'])
def get_users_products():
    try:
        products = Product.query.options(joinedload(Product.product_images)).filter_by(seller_id=current_user.id).all()
        product_data = [make_dict(product) for product in products]
        return jsonify(product_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''GET CURRENT PRODUCT'S REVIEWS'''

@product_get.route('<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    try:
        reviews = ProductReview.query.filter_by(product_id=product_id).all()
        # if not reviews:
        #     return jsonify({'error': 'No reviews for this product'}), 404
        return jsonify([review.to_dict() for review in reviews]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
