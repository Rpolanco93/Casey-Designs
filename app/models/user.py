import datetime
from dataclasses import dataclass
from typing import TYPE_CHECKING, List, Optional

from flask_login import UserMixin
from sqlalchemy import (
    BigInteger,
    DateTime,
    PrimaryKeyConstraint,
    Text,
    UniqueConstraint,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import check_password_hash, generate_password_hash

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import Order
    from app.models import Product
    from app.models import UserRole
    from app.models import ProductFavorite
    from app.models import ProductReview
    from app.models import ShoppingCartItem

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

    orders: Mapped[List['Order']] = relationship('Order', back_populates='purchase')
    products: Mapped[List['Product']] = relationship('Product', back_populates='seller')
    user_roles: Mapped[List['UserRole']] = relationship('UserRole', back_populates='user')
    product_favorites: Mapped[List['ProductFavorite']] = relationship('ProductFavorite', back_populates='user')
    product_reviews: Mapped[List['ProductReview']] = relationship('ProductReview', back_populates='user')
    shopping_cart_items: Mapped[List['ShoppingCartItem']] = relationship('ShoppingCartItem', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
