import datetime
from dataclasses import dataclass
from typing import TYPE_CHECKING, Optional

from sqlalchemy import (
    BigInteger,
    CheckConstraint,
    DateTime,
    ForeignKeyConstraint,
    Index,
    PrimaryKeyConstraint,
    SmallInteger,
    Text,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import User
    from app.models import Product

@dataclass
class ProductReview(db.Model):
    __tablename__ = 'product_reviews'
    __table_args__ = (
        CheckConstraint('stars >= 1 AND stars <= 10', name='product_reviews_stars_check'),
        ForeignKeyConstraint(['product_id'], [SCHEMA + '.products.id'], ondelete='CASCADE', name='product_reviews_product_id_fkey'),
        ForeignKeyConstraint(['user_id'], [SCHEMA + '.users.id'], ondelete='CASCADE', name='product_reviews_user_id_fkey'),
        PrimaryKeyConstraint('product_id', 'user_id', name='product_reviews_pkey'),
        Index('product_reviews_user_id_idx', 'user_id'),
        {'schema': SCHEMA}
    )

    product_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    review: Mapped[str] = mapped_column(Text)
    stars: Mapped[int] = mapped_column(SmallInteger)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    product: Mapped['Product'] = relationship('Product', back_populates='product_reviews')
    user: Mapped['User'] = relationship('User', back_populates='product_reviews')
