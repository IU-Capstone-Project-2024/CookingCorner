from sqlalchemy import Integer, Column, String
from sqlalchemy.orm import relationship

from src.database import Base


class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String(length=200), unique=True, nullable=False)
    recipe = relationship('Recipe', backref="category")
