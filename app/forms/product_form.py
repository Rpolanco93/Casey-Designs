from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange
from app.api.helper import ALLOWED_EXTENSIONS



class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(max=50)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=1000)])
    price = FloatField("Price", validators=[DataRequired(), NumberRange(min=0)])
    image1 = FileField('Image1', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField('Image2', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField('Image3', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image4 = FileField('Image4', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
