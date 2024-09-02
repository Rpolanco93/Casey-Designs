import datetime
from dataclasses import dataclass
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import (
    BigInteger,
    DateTime,
    ForeignKeyConstraint,
    PrimaryKeyConstraint,
    Text,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import ProductCategory

@dataclass
class Category(db.Model):
    __tablename__ = 'categories'
    __table_args__ = (
        ForeignKeyConstraint(['parent_id'], [SCHEMA + '.categories.id'], name='categories_parent_id_fkey'),
        PrimaryKeyConstraint('id', name='categories_pkey'),
        {'schema': SCHEMA}
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    parent_id: Mapped[Optional[int]] = mapped_column(BigInteger)
    description: Mapped[Optional[str]] = mapped_column(Text)
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    parent: Mapped['Category'] = relationship('Category', remote_side=[id], back_populates='parent_reverse')
    parent_reverse: Mapped[List['Category']] = relationship('Category', remote_side=[parent_id], back_populates='parent')
    product_categories: Mapped[List['ProductCategory']] = relationship('ProductCategory', back_populates='category')
