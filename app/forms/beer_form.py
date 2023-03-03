from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import Length, DataRequired, NumberRange


class BeerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    description = TextAreaField('Description', validators=[
                                DataRequired(), Length(max=255)])
    abv = FloatField('ABV', validators=[
                     DataRequired(), NumberRange(min=0, max=100)])
    ibu = FloatField('IBU', validators=[NumberRange(min=0, max=1000)])
    style = StringField('Style', validators=[DataRequired(), Length(max=255)])
    label = StringField('Label', validators=[DataRequired(), Length(max=255)])
    year = IntegerField('Year')

    brewery_id = IntegerField('brewery_id')
    submit = SubmitField('Submit Beer')
