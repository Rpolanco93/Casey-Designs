from time import sleep

from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from app.api.helper import cart_item_dict
from app.models import Product, ShoppingCartItem

cart_get_items = Blueprint('cart_items_get', __name__)

'''GET all cart items'''

@cart_get_items.route('', methods=['GET'])
@login_required
def get_cart_items():
    try:
        items = (
            ShoppingCartItem
            .query
            .filter_by(user_id=current_user.id)
            .options(
                joinedload(ShoppingCartItem.product, innerjoin=True).
                joinedload(Product.product_images),
            )
            .all()
        )
        items_data = [cart_item_dict(item) for item in items]
        return jsonify(items_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500