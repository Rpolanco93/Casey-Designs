from flask import jsonify, request, Blueprint
from flask_login import current_user, login_required
from app.models import Product, db, ProductReview
from app.api.helper import make_dict, review_dict
from app.forms import ProductForm, ReviewForm

product_post = Blueprint('product-post', __name__)

'''create a new product'''

@product_post.route("", methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            seller_id= current_user.id,
            name = form.data['name'],
            price = form.data['price'],
            deleted=False,
            description= form.data['description']
        )

        db.session.add(product)
        db.session.commit()

        return jsonify(make_dict(product)), 201
    return jsonify(form.errors), 400

'''Post a new review for a product by product id'''

@product_post.route('/<int:product_id>/reviews', methods=['POST'])
@login_required
def submit_product_review(product_id):
    data = ProductReview.query.get((product_id, current_user.id))
    exist = {}
    if data:
        exist = review_dict(data)

    if exist and exist['userId']:
        return {'error': 'User already reviewed this item'}

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = ProductReview(
            product_id=product_id,
            review= form.data['review'],
            stars = form.data['stars'],
            user_id = current_user.id
        )
        db.session.add(review)
        db.session.commit()

        return jsonify({'review': review_dict(review)}), 201
    return jsonify(form.errors), 400

# @product_post.route('/<int:product_id>/images', methods=['POST'])
# @login_required
# def submit_product_image(product_id):
#     #need to review how to implement aws
#     pass
