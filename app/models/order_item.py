import datetime
import uuid
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
    Uuid,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import Order
    from app.models import Product

@dataclass
class OrderItem(db.Model):
    __tablename__ = 'order_items'
    __table_args__ = (
        ForeignKeyConstraint(['order_id'], [SCHEMA + '.orders.id'], ondelete='CASCADE', name='order_items_order_id_fkey'),
        ForeignKeyConstraint(['product_id'], [SCHEMA + '.products.id'], ondelete='SET NULL', name='order_items_product_id_fkey'),
        PrimaryKeyConstraint('order_id', 'product_id', name='order_items_pkey'),
        Index('order_items_product_id_idx', 'product_id'),
        {'schema': SCHEMA}
    )

    order_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    product_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    quantity: Mapped[int] = mapped_column(SmallInteger)
    price: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    order: Mapped['Order'] = relationship('Order', back_populates='order_items')
    product: Mapped['Product'] = relationship('Product', back_populates='order_items')
