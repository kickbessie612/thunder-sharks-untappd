from .db import db, environment, SCHEMA, add_prefix_for_prod


class Beer(db.Model):
    __tablename__ = 'beers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False, unique=True)
    abv = db.Column(db.Float, nullable=False)
    ibu = db.Column(db.Float, nullable=True)
    style = db.Column(db.String, nullable=False)
    label = db.Column(db.String)
    year = db.Column(db.Integer, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'users.id')), nullable=False)

    brewery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'breweries.id')), nullable=True)

    user = db.relationship('User', back_populates='beers')
    brewery = db.relationship('Brewery', back_populates='beers')
    reviews = db.relationship('Review', back_populates='beer')

    def to_dict(self, include_relations=True):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'abv': self.abv,
            'ibu': self.ibu,
            'style': self.style,
            'label': self.label,
            'year': self.year,
            'userId': self.user_id
        }
        if include_relations:
            data['brewery'] = self.brewery.to_dict() if self.brewery else None
            data['averageRating'] = sum(
                review.rating for review in self.reviews) / len(self.reviews) if len(self.reviews) else 0
        return data
