import datetime
from dataclasses import dataclass
from typing import TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    DateTime,
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
    from app.models import Product

@dataclass
class ProductImage(db.Model):
    __tablename__ = 'product_images'
    __table_args__ = (
        ForeignKeyConstraint(['product_id'], [SCHEMA + '.products.id'], ondelete='CASCADE', name='product_images_product_id_fkey'),
        PrimaryKeyConstraint('id', name='product_images_pkey'),
        Index('product_images_product_id_idx', 'product_id'),
        {'schema': SCHEMA}
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    product_id: Mapped[int] = mapped_column(BigInteger)
    url: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))

    product: Mapped['Product'] = relationship('Product', back_populates='product_images')
