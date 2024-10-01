import datetime
from dataclasses import dataclass
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Float,
    ForeignKeyConstraint,
    Index,
    PrimaryKeyConstraint,
    Text,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import User
    from app.models import OrderItem
    from app.models import ProductCategory
    from app.models import ProductFavorite
    from app.models import ProductImage
    from app.models import ProductReview
    from app.models import ShoppingCartItem

@dataclass
class Product(db.Model):
    __tablename__ = 'products'
    __table_args__ = (
        ForeignKeyConstraint(['seller_id'], [SCHEMA + '.users.id'], ondelete='CASCADE', name='products_seller_id_fkey'),
        PrimaryKeyConstraint('id', name='products_pkey'),
        Index('products_seller_id_idx', 'seller_id'),
        {'schema': SCHEMA}
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    seller_id: Mapped[int] = mapped_column(BigInteger)
    name: Mapped[str] = mapped_column(Text)
    price: Mapped[float] = mapped_column(Float)
    deleted: Mapped[bool] = mapped_column(Boolean, server_default=text('false'))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    description: Mapped[Optional[str]] = mapped_column(Text)
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    seller: Mapped['User'] = relationship('User', back_populates='products')
    order_items: Mapped[List['OrderItem']] = relationship('OrderItem', back_populates='product')
    product_categories: Mapped[List['ProductCategory']] = relationship('ProductCategory', back_populates='product')
    product_favorites: Mapped[List['ProductFavorite']] = relationship('ProductFavorite', back_populates='product')
    product_images: Mapped[List['ProductImage']] = relationship('ProductImage', back_populates='product')
    product_reviews: Mapped[List['ProductReview']] = relationship('ProductReview', back_populates='product')
    shopping_cart_items: Mapped[List['ShoppingCartItem']] = relationship('ShoppingCartItem', back_populates='product')
