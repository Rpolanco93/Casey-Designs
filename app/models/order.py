import datetime
import uuid
from dataclasses import dataclass
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import (
    BigInteger,
    DateTime,
    Float,
    ForeignKeyConstraint,
    PrimaryKeyConstraint,
    Uuid,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import SCHEMA, db


# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import User
    from app.models import OrderItem

@dataclass
class Order(db.Model):
    __tablename__ = 'orders'
    __table_args__ = (
        ForeignKeyConstraint(['purchase_id'], [SCHEMA + '.users.id'], name='orders_purchase_id_fkey'),
        PrimaryKeyConstraint('id', name='orders_pkey'),
        {'schema': SCHEMA}
    )

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text('gen_random_uuid()'))
    purchase_id: Mapped[int] = mapped_column(BigInteger)
    total: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    purchase: Mapped['User'] = relationship('User', back_populates='orders')
    order_items: Mapped[List['OrderItem']] = relationship('OrderItem', back_populates='order')
