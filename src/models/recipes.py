from sqlalchemy import Integer, Column, String, Text, ForeignKey, Float, ARRAY, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy_utils import JSONType

from src.database import Base


class Recipe(Base):
    __tablename__ = 'recipe'

    id = Column(Integer, primary_key=True)
    name = Column(String(length=200), nullable=False)
    description = Column(Text, nullable=False)
    icon_path = Column(String)
    rating = Column(Float, default=0.0)
    user_id = Column(ForeignKey('users.id'), nullable=False)
    category_id = Column(ForeignKey('category.id'), nullable=False)
    tag_id = Column(ForeignKey('tag.id'))
    preparing_time = Column(Integer)
    cooking_time = Column(Integer)
    waiting_time = Column(Integer)
    total_time = Column(Integer)
    ingredients = Column(ARRAY(JSONType))
    steps = Column(ARRAY(JSONType))
    portions = Column(Integer, default=1)
    comments = Column(Text)
    nutritional_value = Column(Float)
    proteins_value = Column(Float)
    fats_value = Column(Float)
    carbohydrates_value = Column(Float)
    dishes = Column(Text)
    video_link = Column(String)
    source = Column(String)
    is_private = Column(Boolean, nullable=False, default=True)
    creation_time = Column(DateTime)
    users_ratings = Column(JSONType)
    users_ratings_count = Column(Integer, default=0)


class MyRecipe(Base):
    __tablename__ = 'my_recipe'

    id = Column(Integer, primary_key=True)
    recipe_id = Column(Integer, nullable=False)
    user_id = Column(Integer, nullable=False)
    is_favourite = Column(Boolean, nullable=False, default=False)


class Tag(Base):
    __tablename__ = 'tag'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    user_id = Column(ForeignKey('users.id'))
    recipe = relationship('Recipe', backref='tag')
