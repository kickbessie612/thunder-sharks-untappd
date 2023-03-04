from flask import Blueprint, jsonify, request, abort
from flask_login import current_user, login_required
from app import db
from app.models import Review, Beer, User
from app.forms.review_form import AddReviewForm

review_bp = Blueprint('review', __name__)

# Get all reviews for a beer by ID


@review_bp.route('/beer/<int:id>', methods=['GET'])
def get_reviews(id):
    # page = request.args.get('page', 1, type=int)
    # per_page = request.args.get('per_page', 10, type=int)
    # offset = (page - 1) * per_page

    beer = Beer.query.get(id)
    if not beer:
        return jsonify({'message': 'Beer not found', 'statusCode': 404}), 404

    reviews = Review.query.filter_by(
        beer_id=id).all()
    if not reviews:
        return jsonify({'message': 'Reviews couldn\'t be found', 'statusCode': 404}), 404

    review_list = [review.to_dict() for review in reviews]
    for review in review_list:
        review['User'] = User.query.get(review['userId']).to_dict()

    return jsonify({'Reviews': review_list}), 200


# Create a review by Beer Id
@review_bp.route('/<int:beer_id>/reviews', methods=['POST'])
@login_required
def add_review(beer_id):
    beer = Beer.query.get(beer_id)
    if not beer:
        return jsonify({'message': 'Beer ID couldn\'t be found', 'statusCode': 404}), 404

    form = AddReviewForm()
    if form.validate_on_submit():
        review = Review(rating=form.rating.data, comment=form.comment.data,
                        user_id=current_user.id, beer_id=beer_id)
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 200
    else:
        errors = {}
        for field, messages in form.errors.items():
            for message in messages:
                errors[field] = message
        return jsonify({'message': 'Validation error', 'statusCode': 400, 'errors': errors}), 400


# Edit Review
@review_bp.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({'message': 'Couldn\'t find review', 'statusCode': 404}), 404
    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 401}), 401

    form = AddReviewForm()
    if form.validate_on_submit():
        review.rating = form.rating.data
        review.comment = form.comment.data
        db.session.commit()
        return jsonify(review.to_dict()), 200
    else:
        errors = {}
        for field, messages in form.errors.items():
            for message in messages:
                errors[field] = message
        return jsonify({'message': 'Validation error', 'statusCode': 400, 'errors': errors}), 400


# Delete a Review
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
# @review_bp.route('', methods=['GET'])
# def get_all_reviews():
#     page = request.args.get('page', 1, type=int)
#     per_page = request.args.get('per_page', 10, type=int)
#     offset = (page - 1) * per_page

#     reviews = Review.query.offset(offset).limit(per_page).all()

#     return jsonify([review.to_dict() for review in reviews]), 200
