from flask import jsonify, request, Blueprint
from flask_login import current_user, login_required
from app.models import Product, db, ProductReview, ProductImage
from app.api.helper import make_dict, review_dict
from app.forms import ProductForm, ReviewForm, EditProductForm
from app.api.helper import upload_file_to_s3, get_unique_filename

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

@product_post.route('/<int:product_id>/review', methods=['POST'])
@login_required
def submit_product_review(product_id):
    data = ProductReview.query.get((product_id, current_user.id))
    exist = {}
    if data:
        exist = review_dict(data)

    if exist and exist['userId']:
        return jsonify({'error': True, 'message': 'User already reviewed this item'}), 403

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

@product_post.route('/<int:product_id>/images', methods=['POST'])
@login_required
def submit_product_image(product_id):
    form = ProductForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image1 = form.data['image1']
        image1.filename = get_unique_filename(image1.filename)
        upload = upload_file_to_s3(image1)
        # Error Checking
        # print('='*30, upload, '='*30)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return jsonify(upload)

        new_image = ProductImage(
            product_id=product_id,
            url=upload['url']
        )

        db.session.add(new_image)
        db.session.commit()

        return jsonify({'message': 'Images Creation Successful'})

    return jsonify(form.errors), 400

@product_post.route('/<int:product_id>/images', methods=['PUT'])
@login_required
def edit_product_image(product_id):
    form = EditProductForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image1 = form.data['image1']
        image1.filename = get_unique_filename(image1.filename)
        upload = upload_file_to_s3(image1)
        # Error Checking
        # print('='*30, upload, '='*30)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return jsonify(upload)

        new_image = ProductImage(
            product_id=product_id,
            url=upload['url']
        )

        db.session.add(new_image)
        db.session.commit()

        return jsonify({'message': 'Images Creation Successful'})

    return jsonify(form.errors), 400
