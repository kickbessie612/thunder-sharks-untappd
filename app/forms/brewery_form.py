from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, SubmitField
from wtforms.validators import Length, DataRequired


class BreweryForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    address = StringField('Address', validators=[
                          DataRequired(), Length(max=255)])
    city = StringField('City', validators=[DataRequired(), Length(max=255)])
    state = StringField('State', validators=[DataRequired(), Length(max=255)])
    country = StringField('Country', validators=[
                          DataRequired(), Length(max=255)])
    type = SelectField('Type', choices=[('Microbrewery', 'Microbrewery'),
                                        ('Nano Brewery', 'Nano Brewery '),
                                        ('Meadery', 'Meadery'),
                                        ('Contract Brewery', 'Contract Brewery'),
                                        ('Regional Brewery', 'Regional Brewery')], validators=[DataRequired()])
    description = TextAreaField('Description', validators=[
                                DataRequired(), Length(max=255)])
    picture = StringField('Picture URL')
