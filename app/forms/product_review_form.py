from flask_wtf import FlaskForm
from wtforms import TextAreaField, FloatField, IntegerField
from wtforms.validators import DataRequired, NumberRange


class ReviewForm(FlaskForm):
    review = TextAreaField("Review", validators=[DataRequired()])
    stars = FloatField("Rating", validators=[DataRequired(), NumberRange(min=0, max=5, message='"Rating must be a number between 1 to 5"')])
