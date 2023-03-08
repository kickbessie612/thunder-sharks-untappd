from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Beer, Review
from app.forms import BeerForm, ReviewForm


beer_bp = Blueprint('beer', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET ALL BEERS
@beer_bp.route('')
def get_all_beers():
    """
    Query for all beers and returns them in a list of beer dictionaries
    """
    beers = Beer.query.options(joinedload(
        Beer.reviews), joinedload(Beer.brewery)).all()
    return [beer.to_dict() for beer in beers]


# GET BEER BY ID
@beer_bp.route('/<int:id>')
def get_beer(id):
    """
    Query for a beer by id and returns that beer in a dictionary
    """
    beer = Beer.query.options(joinedload(Beer.reviews), joinedload(Beer.brewery)).get(id)
    if beer:
        # Get the 10 most recent reviews for the beer
        recent_reviews = sorted(beer.reviews, key=lambda x: x.created_at, reverse=True)[:10]
        recent_reviews_dict = [review.to_dict() for review in recent_reviews]

        return jsonify({
            'beer': beer.to_dict(),
            'recent_reviews': recent_reviews_dict
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Beer not found'
        })



# CREATE A BEER
@beer_bp.route('', methods=['POST'])
@login_required
def create_beer():
    """
    Query for creating a beer and returning it as a dictionary
    """
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_beer = Beer()
        new_beer.user_id = current_user.id
        form.populate_obj(new_beer)
        db.session.add(new_beer)
        print(new_beer)
        db.session.commit()
        return jsonify(

            new_beer.to_dict()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE A BEER
@beer_bp.route('/<int:id>', methods=['PUT'])
@login_required
def edit_beer(id):
    """
    Update a beer
    """
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        beer = Beer.query.options(joinedload(
            Beer.reviews), joinedload(Beer.brewery)).get(id)
        form.populate_obj(beer)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Beer created successfully!',
            'beer': [beer.to_dict()]
        })
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A BEER
@beer_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_beer(id):
    """
    Delete a beer
    """

    beer = Beer.query.get(id)

    db.session.delete(beer)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Beer deleted successfully!'
    })


# GET ALL REVIEWS BY BEER ID
@beer_bp.route('/<int:id>/reviews')
def get_reviews(id):
    # page = request.args.get('page', 1, type=int)
    # per_page = request.args.get('per_page', 10, type=int)
    # offset = (page - 1) * per_page

    # beer = Beer.query.get(id)
    # if not beer:
    #     return jsonify({'message': 'Beer not found', 'statusCode': 404}), 404

    reviews = Review.query.options(joinedload(Review.user)).filter_by(
        beer_id=id).all()
    if not reviews:
        return jsonify({'message': 'Reviews couldn\'t be found', 'statusCode': 404}), 404

    review_list = [review.to_dict() for review in reviews]
    # for review in review_list:
    #     review['User'] = User.query.get(review['userId']).to_dict()

    return jsonify(review_list), 200


# CREATE A REVIEW BY BEER ID
@beer_bp.route('/<int:beer_id>/reviews', methods=['POST'])
@login_required
def add_review(beer_id):
    beer = Beer.query.get(beer_id)
    if not beer:
        return jsonify({'message': 'Beer ID couldn\'t be found', 'statusCode': 404}), 404
    print(request.json)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review()
        review.user_id = current_user.id
        review.beer_id = beer_id
        form.populate_obj(review)
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 200
    else:
        errors = {}
        for field, messages in form.errors.items():
            for message in messages:
                errors[field] = message
        return jsonify({'message': 'Validation error', 'statusCode': 400, 'errors': errors}), 400
