from flask import Blueprint
from flask_login import login_required, current_user
from app.models import  ShoppingCartItem, db

cart_delete_items = Blueprint('cart_items_delete', __name__)

'''
Delete cart item by cart id
'''

@cart_delete_items.route("/<int:product_id>", methods=['DELETE'])
@login_required
def remove_from_cart(product_id):
    item = ShoppingCartItem.query.get_or_404((current_user.id, product_id))

    db.session.delete(item)
    db.session.commit()
    return { 'id': product_id }
