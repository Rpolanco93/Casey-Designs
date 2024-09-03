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
    from app.models import Category
    from app.models import Product

@dataclass
class ProductCategory(db.Model):
    __tablename__ = 'product_categories'
    __table_args__ = (
        ForeignKeyConstraint(['category_id'], [SCHEMA + '.categories.id'], ondelete='CASCADE', name='product_categories_category_id_fkey'),
        ForeignKeyConstraint(['product_id'], [SCHEMA + '.products.id'], ondelete='CASCADE', name='product_categories_product_id_fkey'),
        PrimaryKeyConstraint('product_id', 'category_id', name='product_categories_pkey'),
        Index('product_categories_category_id_idx', 'category_id'),
        {'schema': SCHEMA}
    )

    product_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    category_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))

    category: Mapped['Category'] = relationship('Category', back_populates='product_categories')
    product: Mapped['Product'] = relationship('Product', back_populates='product_categories')
