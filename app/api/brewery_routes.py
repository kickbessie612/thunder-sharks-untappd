from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import login_required, current_user

from app.models import db, Brewery
from app.forms.brewery_form import BreweryForm

brewery_bp = Blueprint('brewery', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET ALL BREWERIES
@brewery_bp.route('', methods=['GET'])
def get_all_breweries():
    """
    Query for all breweries and returns them in a list of brewery dictionaries
    """
    breweries = Brewery.query.all()
    return [brewery.to_dict() for brewery in breweries]


# GET BREWERY BY ID
@brewery_bp.route('/<int:id>')
def get_brewery(id):
    """
    Query for a brewery by id and returns that brewery in a dictionary
    """
    brewery = Brewery.query.get(id)
    if brewery:
        return jsonify(brewery.to_dict())
    else:
        return jsonify({
            'success': False,
            'message': 'Brewery not found'
        })


# CREATE A BREWERY
@brewery_bp.route('', methods=['POST'])
@login_required
def create_brewery():
    """
    Query for creating a brewery and returning it as a dictionary
    """
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_brewery = Brewery()
        new_brewery.user_id = current_user.id
        form.populate_obj(new_brewery)
        db.session.add(new_brewery)
        db.session.commit()
        return jsonify(

            new_brewery.to_dict()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE A BREWERY
@brewery_bp.route('/<int:id>', methods=['PUT'])
@login_required
def edit_brewery(id):
    """
    Update a brewery
    """
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        brewery = Brewery.query.get(id)
        form.populate_obj(brewery)
        db.session.commit()
        return jsonify(brewery.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A BREWERY
@brewery_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_brewery(id):
    """
    Delete a brewery
    """

    brewery = Brewery.query.get(id)

    db.session.delete(brewery)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Brewery deleted successfully!'
    })

# NOTES
    #    new_brewery = Brewery()
    #       form.populate_obj(new_brewery)

    #  replaces

    # new_brewery = Brewery(
    #     name=form.name.data,
    #     address=form.address.data,
    #     city=form.city.data,
    #     state=form.state.data,
    #     country=form.country.data,
    #     type=form.type.data,
    #     description=form.description.data,
    #     picture=form.picture.data
    # )
