from typing import List, Optional
from sqlalchemy import BigInteger, Boolean, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, String, Text, UniqueConstraint, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
from dataclasses import dataclass
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.db import db, SCHEMA
from typing import TYPE_CHECKING
# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import Role
    from app.models import UserRole
    pass

@dataclass
class User(db.Model, UserMixin):
    __tablename__ = 'users'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='users_pkey'),
        UniqueConstraint('email', name='users_email_key'),
        UniqueConstraint('username', name='users_username_key'),
        {'schema': SCHEMA}
    )

    # Add stub for password field
    password: Mapped[str]

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    first_name: Mapped[str] = mapped_column(Text)
    last_name: Mapped[str] = mapped_column(Text)
    email: Mapped[str] = mapped_column(Text)
    username: Mapped[str] = mapped_column(Text)
    hashed_password: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    user_roless: Mapped[List['UserRole']] = relationship('UserRole', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)