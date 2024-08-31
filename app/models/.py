from dataclasses import dataclass
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.db import db, SCHEMA
from typing import TYPE_CHECKING
# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    pass