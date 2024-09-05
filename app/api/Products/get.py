from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product, ProductReview
from sqlalchemy.orm import joinedload
from app.api.helper import make_dict, review_dict

product_routes = Blueprint('product-get', __name__)

'''GET ALL PRODUCTS '''

@product_routes.route('', methods=['GET'])
def get_active_products():
    try:
        products = (
            Product
            .query
            .filter_by(deleted=False)
            .options(
                joinedload(Product.product_images),
                joinedload(Product.product_reviews)
            )
        )
        products_data = [make_dict(product) for product in products]
        return jsonify(products_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''GET PRODUCT BY ID'''

@product_routes.route('/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        product = Product.query.options(joinedload(Product.product_images), joinedload(Product.product_reviews)).get_or_404(product_id)
        product_data = make_dict(product)
        return jsonify(product_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''GET CURRENT USERS PRODUCTS'''

@product_routes.route('current', methods=['GET'])
@login_required
def get_users_products():
    try:
        products = Product.query.options(joinedload(Product.product_images)).filter_by(seller_id=current_user.id).all()
        product_data = [make_dict(product) for product in products]
        return jsonify(product_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''GET CURRENT PRODUCT'S REVIEWS'''

@product_routes.route('<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    try:
        reviews = (
                    ProductReview
                   .query
                   .filter_by(product_id=product_id)
                   .all()
                )
        # if not reviews:
        #     return jsonify({'error': 'No reviews for this product'}), 404
        return jsonify([review_dict(review) for review in reviews]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''Get all products included deleted'''

@product_routes.route('/all', methods=['GET'])
def get_all_products():
    try:
        products = (
            Product
            .query
            .options(
                joinedload(Product.product_images),
                joinedload(Product.product_reviews)
            )
        )
        products_data = [make_dict(product) for product in products]
        return jsonify(products_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@product_routes.route('/deleted', methods=['GET'])
def get_deleted_products():
    try:
        products = (
            Product
            .query
            .filter_by(deleted=True)
            .options(
                joinedload(Product.product_images),
                joinedload(Product.product_reviews)
            )
        )
        products_data = [make_dict(product) for product in products]
        return jsonify(products_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
