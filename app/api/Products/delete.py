from flask import jsonify, Blueprint
from flask_login import current_user, login_required
from app.models import Product, db

product_delete = Blueprint('product-delete', __name__)

'''Delete a product by product id'''

@product_delete.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    if product.seller_id == current_user.id:
        product.deleted = True
        db.session.add(product)
        # db.session.delete(product)
        db.session.commit()

        return {'message': "Product Deleted"}
    return {'message': 'Unauthorized'}, 403

'''Delete an image from aws'''

@product_delete.route('/<int:product_id>/images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_product_image(product_id, image_id):
    # need to implement aws
    pass
