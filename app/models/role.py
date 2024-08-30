from typing import List, Optional
from sqlalchemy import BigInteger, Boolean, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, String, Text, UniqueConstraint, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
from dataclasses import dataclass
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.db import db, SCHEMA
from typing import TYPE_CHECKING

# Load imports for type checking only to prevent import cycles
if TYPE_CHECKING:
    from app.models import User
    from app.models import UserRole
    pass

@dataclass
class Role(db.Model):
    __tablename__ = 'roles'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='roles_pkey'),
        {'schema': SCHEMA}
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))
    description: Mapped[Optional[str]] = mapped_column(Text)
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    user_roless: Mapped[List['UserRole']] = relationship('UserRole', back_populates='role')
