import datetime
from dataclasses import dataclass
from typing import TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    DateTime,
    ForeignKeyConstraint,
    Index,
    PrimaryKeyConstraint,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import User
    from app.models import Product

@dataclass
class ProductFavorite(db.Model):
    __tablename__ = 'product_favorites'
    __table_args__ = (
        ForeignKeyConstraint(['product_id'], [SCHEMA + '.products.id'], ondelete='CASCADE', name='product_favorites_product_id_fkey'),
        ForeignKeyConstraint(['user_id'], [SCHEMA + '.users.id'], ondelete='CASCADE', name='product_favorites_user_id_fkey'),
        PrimaryKeyConstraint('product_id', 'user_id', name='product_favorites_pkey'),
        Index('product_favorites_user_id_idx', 'user_id'),
        {'schema': SCHEMA}
    )

    product_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))

    product: Mapped['Product'] = relationship('Product', back_populates='product_favorites')
    user: Mapped['User'] = relationship('User', back_populates='product_favorites')
