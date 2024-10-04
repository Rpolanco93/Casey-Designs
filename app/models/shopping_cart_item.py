import datetime
from dataclasses import dataclass
from typing import TYPE_CHECKING, Optional

from sqlalchemy import (
    BigInteger,
    DateTime,
    Float,
    ForeignKeyConstraint,
    Index,
    PrimaryKeyConstraint,
    SmallInteger,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import User
    from app.models import Product

@dataclass
class ShoppingCartItem(db.Model):
    __tablename__ = 'shopping_cart_items'
    __table_args__ = (
        ForeignKeyConstraint(['product_id'], [SCHEMA + '.products.id'], ondelete='CASCADE', name='shopping_cart_items_product_id_fkey'),
        ForeignKeyConstraint(['user_id'], [SCHEMA + '.users.id'], ondelete='CASCADE', name='shopping_cart_items_user_id_fkey'),
        PrimaryKeyConstraint('user_id', 'product_id', name='shopping_cart_items_pkey'),
        Index('shopping_cart_items_product_id_idx', 'product_id'),
        {'schema': SCHEMA}
    )

    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    product_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    quantity: Mapped[int] = mapped_column(SmallInteger)
    price: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    product: Mapped['Product'] = relationship('Product', back_populates='shopping_cart_items')
    user: Mapped['User'] = relationship('User', back_populates='shopping_cart_items')
