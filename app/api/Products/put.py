from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Product, db, ProductReview
from app.api.helper import make_dict
from app.forms import ProductForm, ReviewForm

product_put = Blueprint('product-put', __name__)

'''edit an existing product'''

@product_put.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    product = Product.query.get_or_404(product_id)

    if product.seller_id == current_user.id:
        form = ProductForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            product.name = form.data['name']
            product.price = form.data['price']
            product.description = form.data['description']

            db.session.commit()
            return jsonify(make_dict(product))

        return jsonify(form.errors, 400)

    return {'message': 'Unauthorized'}, 403

@product_put.route('/<int:product_id>/review', methods=['PUT'])
@login_required
def edit_review(product_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = ProductReview.query.get((product_id, current_user.id))

        if not review:
            return {"errors": {"message": "Invalid review id"}}, 404

        if review.user_id != current_user.id:
            return {"errors": {"message": "You must be the owner of this review to edit"}}, 403

        review.review = form.data["review"]
        review.stars = form.data["stars"]

        db.session.commit()
        return review.to_dict()

    return form.errors, 401
