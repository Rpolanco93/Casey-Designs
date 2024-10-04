from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import  ShoppingCartItem, Product, db

cart_add_items = Blueprint('cart_items_post', __name__)

'''Add / Edit cart items'''

@cart_add_items.route("/<int:product_id>", methods=['POST', 'PUT'])
@login_required
def add_to_cart(product_id):
    # check if item is in cart already
    check_cart = ShoppingCartItem.query.filter(ShoppingCartItem.user_id==current_user.id, ShoppingCartItem.product_id==product_id).first()
    # get the body from the request
    r = request.get_json()
    # if item is already in cart / update quantity
    if check_cart:
        check_cart.quantity = r['quantity']
        data = check_cart.to_dict()
        db.session.commit()
        return jsonify(data)
    else:
        cart_item = ShoppingCartItem(
            user_id = current_user.id,
            product_id = product_id,
            quantity = r['quantity'],
            price = r['price']
        )

        db.session.add(cart_item)
        db.session.commit()
        data = cart_item.to_dict()
        return jsonify(data), 200