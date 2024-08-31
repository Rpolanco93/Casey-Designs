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
    from app.models import Role
    from app.models import User
    pass

@dataclass
class UserRole(db.Model):
    __tablename__ = 'user_roles'
    __table_args__ = (
        ForeignKeyConstraint(['role_id'], [SCHEMA + '.roles.id'], ondelete='CASCADE', name='user_roles_role_id_fkey'),
        ForeignKeyConstraint(['user_id'], [SCHEMA + '.users.id'], ondelete='CASCADE', name='user_roles_user_id_fkey'),
        PrimaryKeyConstraint('user_id', 'role_id', name='user_roles_pkey'),
        Index('user_roles_role_id_idx', 'role_id'),
        {'schema': SCHEMA}
    )

    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    role_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), server_default=text('clock_timestamp()'))

    role: Mapped['Role'] = relationship('Role', back_populates='user_roless')
    user: Mapped['User'] = relationship('User', back_populates='user_roless')