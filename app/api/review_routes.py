from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app import db
from app.models import Review
from app.forms import ReviewForm

review_bp = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# UPDATE A REVIEW
@review_bp.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({'message': 'Couldn\'t find review', 'statusCode': 404}), 404
    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 401}), 401

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(review)
        db.session.commit()
        return jsonify(review.to_dict()), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A REVIEW
@review_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({'message': 'Review couldn\'t be found', 'statusCode': 404}), 404
    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 401}), 401

    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted', 'statusCode': 200}), 200


# Get all reviews
@review_bp.route('', methods=['GET'])
def get_recent_reviews():
    reviews = Review.query.options(
        joinedload(Review.user),
        joinedload(Review.beer)
    ).order_by(Review.created_at.desc()).limit(10)
    return jsonify([review.to_dict() for review in reviews]), 200
