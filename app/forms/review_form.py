from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange

class AddReviewForm(FlaskForm):
    body = StringField('Body', validators=[DataRequired(), Length(max=1000)])
    images = StringField('Images', validators=[Length(max=500)])
    ratings = FloatField('Ratings', validators=[DataRequired(), NumberRange(min=0, max=5)])
    user_id = IntegerField('User ID', validators=[DataRequired(), NumberRange(min=1)])
    beer_id = IntegerField('Beer ID', validators=[DataRequired(), NumberRange(min=1)])
