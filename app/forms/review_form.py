from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange

class AddReviewForm(FlaskForm):
    rating = FloatField('Rating', validators=[DataRequired(), NumberRange(min=0, max=5)])
    comment = TextAreaField('Comment', validators=[Length(max=200)])
    user_id = IntegerField('User ID', validators=[DataRequired(), NumberRange(min=1)])
    beer_id = IntegerField('Beer ID', validators=[DataRequired(), NumberRange(min=1)])
    