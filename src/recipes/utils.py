from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import Category, Tag, Recipe
from src.models.recipes import MyRecipe


async def get_category(db: AsyncSession, category_name: str) -> Category | None:
    query = select(Category).where(Category.name == category_name)
    category = await db.execute(query)
    category = category.first()
    if category is None:
        return
    category = category[0]
    return category


async def get_tag(db: AsyncSession, user_id: int, tag_name: str) -> Tag | None:
    query = select(Tag).where(Tag.user_id == user_id).where(Tag.name == tag_name)
    tag = await db.execute(query)
    tag = tag.first()
    if tag is None:
        return
    tag = tag[0]
    return tag


async def check_recipe_exists(db: AsyncSession, recipe_id: int, user_id: int | None = None) -> bool:
    if user_id is not None:
        query = select(Recipe).where(Recipe.id == recipe_id).where(Recipe.user_id == user_id)
    else:
        query = select(Recipe).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    if recipe.first() is None:
        return False
    return True


async def check_my_recipe_exists(db: AsyncSession, recipe_id: int, user_id: int) -> bool:
    query = select(MyRecipe).where(MyRecipe.recipe_id == recipe_id).where(MyRecipe.user_id == user_id)
    my_recipe = await db.execute(query)
    if my_recipe.first() is None:
        return False
    return True


async def get_recipe(db: AsyncSession, user_id: int, recipe_id: int) -> Recipe | None:
    query = select(Recipe).where(Recipe.id == recipe_id).where(Recipe.user_id == user_id)
    recipe = await db.execute(query)
    recipe = recipe.first()
    if recipe is None:
        return
    return recipe[0]
