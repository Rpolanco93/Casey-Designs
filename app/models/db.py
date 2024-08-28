import os

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy_mixins import AllFeaturesMixin


class Base(DeclarativeBase, AllFeaturesMixin):
    pass


environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy(model_class=Base)
