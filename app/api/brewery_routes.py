from flask import Blueprint, request, redirect, url_for, jsonify
from .models import db, Brewery
from .forms import BreweryForm

brewery_bp = Blueprint('brewery', __name__, url_prefix='/brewery')

#GET ALL BREWERIES
@brewery_bp.route('/breweries')
def get_all_breweries():
    breweries = Brewery.query.all()
    return jsonify([brewery.to_dict() for brewery in breweries])

#CREATE A BREWERY
@brewery_bp.route('/create', methods=['POST'])
def create_brewery():
    form = BreweryForm()
    if request.method == 'POST' and form.validate_on_submit():
        new_brewery = Brewery()
        form.populate_obj(new_brewery)
        # brewery = Brewery(
        #     name=form.name.data,
        #     address=form.address.data,
        #     city=form.city.data,
        #     state=form.state.data,
        #     country=form.country.data,
        #     type=form.type.data,
        #     description=form.description.data,
        #     picture=form.picture.data
        # )
        db.session.add(new_brewery)
        db.session.commit()
        flash('Brewery created successfully!', 'success')
        return redirect(url_for('/brewery', id=new_brewery.id))
    return jsonify({
            'success': True,
            'message': 'Brewery created successfully!',
            'brewery': new_brewery.to_dict(),
        })



@brewery_bp.route('/<int:id>')
def get_brewery(id):
    brewery = Brewery.query.get(id)
    if brewery:
        return jsonify(brewery.to_dict())
    else:
        return jsonify({
            'success': False,
            'message': 'Brewery not found'
        })
