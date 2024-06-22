from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import Category, Tag, Recipe


async def get_category_id(db: AsyncSession, category_name: str) -> int:
    query = select(Category).where(Category.name == category_name)
    category_id = await db.execute(query)
    if category_id.first() is None:
        return 0
    category_id = category_id.first()[0]
    return category_id


async def get_tag_id(db: AsyncSession, user_id: int, tag_name: str) -> int:
    query = select(Tag).where(Tag.user_id == user_id).where(Tag.name == tag_name)
    tag_id = await db.execute(query)
    if tag_id.first() is None:
        return 0
    tag_id = tag_id.first()[0]
    return tag_id


async def check_recipe_exists(db: AsyncSession, recipe_id: int) -> bool:
    query = select(Recipe).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    if recipe.first() is None:
        return False
    return True
