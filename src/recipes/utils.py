from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import Category, Tag, Recipe


async def get_category(db: AsyncSession, category_name: str) -> Category | None:
    query = select(Category).where(Category.name == category_name)
    category = await db.execute(query)
    if category.first() is None:
        return
    category = category.first()[0]
    return category


async def get_tag(db: AsyncSession, user_id: int, tag_name: str) -> Tag | None:
    query = select(Tag).where(Tag.user_id == user_id).where(Tag.name == tag_name)
    tag = await db.execute(query)
    if tag.first() is None:
        return
    tag = tag.first()[0]
    return tag


async def check_recipe_exists(db: AsyncSession, recipe_id: int) -> bool:
    query = select(Recipe).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    if recipe.first() is None:
        return False
    return True
