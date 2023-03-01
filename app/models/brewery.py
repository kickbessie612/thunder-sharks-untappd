
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Brewery(db.Model):
    __tablename__ = 'breweries'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    picture = db.Column(db.String(255), nullable=False)

    beers = db.relationship('Beer', back_populates='brewery')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'type': self.type,
            'description': self.description,
            'picture': self.picture,
        }
