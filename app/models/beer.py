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

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)

    brewery_id = db.Column(db.Integer, db.ForeignKey(
        'breweries.id'), nullable=True)

    user = db.relationship('User', back_populates='beers')
    brewery = db.relationship('Brewery', back_populates='beers')
    reviews = db.relationship('Review', backref='beer', lazy=True)

    @property
    def average_rating(self):
        if self.reviews:
            return sum(review.rating for review in self.reviews) / len(self.reviews)
        else:
            return 0

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'abv': self.abv,
            'ibu': self.ibu,
            'style': self.style,
            'label': self.label,
            'year': self.year,
            'userId': self.user_id,
            'brewery': self.brewery.to_dict() if self.brewery else None,
            'averageRating': self.average_rating
        }
