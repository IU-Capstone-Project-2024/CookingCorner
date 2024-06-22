from sqlalchemy import Integer, Column, String, Text, ForeignKey, Float, ARRAY
from sqlalchemy.orm import relationship

from src.database import Base


class Recipe(Base):
    __tablename__ = 'recipe'

    id = Column(Integer, primary_key=True)
    name = Column(String(length=200), unique=True, nullable=False)
    description = Column(Text, nullable=False)
    icon_path = Column(String)
    rating = Column(Float)
    user_id = Column(ForeignKey('users.id'))
    category_id = Column(ForeignKey('category.id'))
    tag = relationship('Tag', secondary='recipe_tag', back_populates='recipe')
    preparing_time = Column(Integer)
    cooking_time = Column(Integer)
    waiting_time = Column(Integer)
    total_time = Column(Integer)
    portions = Column(Integer)
    ingredients = Column(Text)
    how_to_cook = Column(Text)
    images_paths = Column(ARRAY(String))
    comments = Column(Text)
    nutritional_value = Column(Float)
    proteins_value = Column(Float)
    fats_value = Column(Float)
    carbohydrates_value = Column(Float)
    dishes = Column(Text)
    video_link = Column(String)
    source = Column(String)

class Tag(Base):
    __tablename__ = 'tag'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    user_id = Column(ForeignKey('users.id'))
    recipe = relationship('Recipe', secondary='recipe_tag', back_populates='tag')

class RecipeTag(Base):
    __tablename__ = 'recipe_tag'

    id = Column(Integer, primary_key=True)
    recipe_id = Column(ForeignKey('recipe.id'), nullable=False)
    tag_id = Column(ForeignKey('tag.id'), nullable=False)
