from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Date,
    Time,
    DateTime,
    Text,
)
from sqlalchemy.sql import func

from app.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    description = Column(Text, nullable=True)

    completed = Column(Boolean, default=False)

    priority = Column(String(20), default="Medium")

    category = Column(String(50), nullable=True)

    due_date = Column(Date, nullable=True)

    due_time = Column(Time, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )