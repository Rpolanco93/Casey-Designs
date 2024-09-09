from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import ProductReview, db

review_delete_routes = Blueprint("review_delete", __name__)


@review_delete_routes.route("/<int:product_id>", methods=["DELETE"])
@login_required
def delete_review(product_id):
    '''
    Delete a Review by Id
    '''
    review = ProductReview.query.get((product_id, current_user.id))

    if not review:
        return {"errors": {"message": "Invalid review id"}}, 404

    if review.user_id != current_user.id:
        return {"errors": {"message": "You must own the review to remove it from the system"}}, 403

    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted review"}
