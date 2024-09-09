from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import ProductReview, db, User
from app.api.helper import review_dict
from app.forms import ReviewForm
from sqlalchemy.orm import joinedload

review_submission = Blueprint('review-submission', __name__)

'''edit a review'''

@review_submission.route('/<int:product_id>/reviews', methods=['PUT'])
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
