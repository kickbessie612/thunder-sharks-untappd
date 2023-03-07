from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from app.models import db, Beer
# from app.forms.brewery_form import BreweryForm
from app.forms.beer_form import BeerForm

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
@beer_bp.route('/', methods=['GET'])
def get_all_beers():
    """
    Query for all beers and returns them in a list of beer dictionaries
    """
    beers = Beer.query.all()
    return [beer.to_dict() for beer in beers]


# GET BEER BY ID
@beer_bp.route('/<int:id>')
def get_beer(id):
    """
    Query for a beer by id and returns that beer in a dictionary
    """
    beer = Beer.query.get(id)
    if beer:
        return jsonify(beer.to_dict())
    else:
        return jsonify({
            'success': False,
            'message': 'Beer not found'
        })


# CREATE A BEER
@beer_bp.route('/', methods=['POST'])
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
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Brewery created successfully!',
            'brewery': [new_beer.to_dict()]
        })
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
        beer = Beer.query.get(id)
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
