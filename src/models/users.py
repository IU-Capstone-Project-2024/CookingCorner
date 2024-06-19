from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    hashed_password: str = Column(String(length=1024), nullable=False)
    email = Column(String())
    name = Column(String)
    surname = Column(String)
    cooking_experience = Column(Integer)
    tag = relationship('Tag', backref="users")
    recipe = relationship('Recipe', backref="users")
