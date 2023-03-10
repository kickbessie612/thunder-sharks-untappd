from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import Length, DataRequired


class BreweryForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    address = StringField('Address', validators=[
                          DataRequired(), Length(max=255)])
    city = StringField('City', validators=[DataRequired(), Length(max=255)])
    state = StringField('State', validators=[DataRequired(), Length(max=255)])
    country = StringField('Country', validators=[
                          DataRequired(), Length(max=255)])
    type = StringField('Type', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[
                                DataRequired(), Length(max=255)])
    picture = StringField('Picture URL')
