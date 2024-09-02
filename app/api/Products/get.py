from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product, ProductImage, db
from sqlalchemy.orm import joinedload
from . import make_dict

product_get_routes = Blueprint('product-get', __name__)

'''GET ALL PRODUCTS '''

@product_get_routes.route('', methods=['GET'])
def get_all_products():
    try:
        products = Product.query.options(joinedload(Product.product_images))
        products_data = [make_dict(product) for product in products]
        return jsonify(products_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
