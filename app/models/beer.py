from .db import db, environment, SCHEMA, add_prefix_for_prod, relationship


class Beer(db.Model):
    __tablename__ = 'beers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False, unique=True)
    abv = db.Column(db.Number(255), nullable=False)
    ibu = db.Column(db.Number(255))
    style = db.Column(db.String, nullable=False)
    label = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)

    brewery_id = db.Column(db.Integer, db.ForeignKey(
        'brewery.id'), nullable=False)

    user = relationship('User', back_populates='beers')
    brewery = relationship('Brewery', back_populates='beers')
    reviews = relationship('Review', back_populates='beers')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name
        }
