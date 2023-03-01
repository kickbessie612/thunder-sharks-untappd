from flask import Blueprint, request, redirect, url_for, jsonify
from app.models import db, Brewery
from app.forms.brewery_form import BreweryForm

brewery_bp = Blueprint('brewery', __name__, url_prefix='/brewery')

#GET ALL BREWERIES
@brewery_bp.route('/breweries')
def get_all_breweries():
    """
    Query for all breweries and returns them in a list of brewery dictionaries
    """
    breweries = Brewery.query.all()
    return {'breweries': [brewery.to_dict() for brewery in breweries]}

#CREATE A BREWERY
# add this line below back in when form is usable
# if request.method == 'POST' and form.validate_on_submit():
@brewery_bp.route('/create', methods=['POST'])
def create_brewery():
    """
    Query for creating a brewery and returning it as a dictionary
    """
    form = BreweryForm()
    if request.method == 'POST' and form.validate_on_submit(): 
        new_brewery = Brewery()
        # form.populate_obj(new_brewery)
        new_brewery = Brewery(
            name=form.name.data,
            address=form.address.data,
            city=form.city.data,
            state=form.state.data,
            country=form.country.data,
            type=form.type.data,
            description=form.description.data,
            picture=form.picture.data
        )
        print("HEEELOOOOOOO")
        db.session.add(new_brewery)
        db.session.commit()
        # flash('Brewery created successfully!', 'success')
        return jsonify({
                'success': True,
                'message': 'Brewery created successfully!',
                'brewery': [new_brewery.to_dict()]
                 })
    return jsonify({
            'success': False,
            'message': 'Failed to create brewery'
        })

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
