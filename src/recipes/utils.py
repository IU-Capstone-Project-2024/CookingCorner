from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import Category, Tag, Recipe, User
from src.models.recipes import MyRecipe
from src.recipes.schemas import RecipeWithAdditionalDataSchema


async def get_category_by_name(db: AsyncSession, category_name: str) -> Category | None:
    query = select(Category).where(Category.name == category_name)
    category = await db.execute(query)
    category = category.first()
    if category is None:
        return
    category = category[0]
    return category


async def get_tag_by_name(db: AsyncSession, user_id: int, tag_name: str) -> Tag | None:
    query = select(Tag).where(Tag.user_id == user_id).where(Tag.name == tag_name)
    tag = await db.execute(query)
    tag = tag.first()
    if tag is None:
        return
    tag = tag[0]
    return tag


async def get_tag_by_recipe(db: AsyncSession, recipe: Recipe) -> Tag | None:
    query = select(Tag).where(Tag.id == recipe.tag_id)
    tag = await db.execute(query)
    tag = tag.first()[0]
    return tag


async def get_category_by_recipe(db: AsyncSession, recipe: Recipe) -> Category | None:
    query = select(Category).where(Category.id == recipe.category_id)
    category = await db.execute(query)
    category = category.first()[0]
    return category


async def get_creator_username(db: AsyncSession, recipe: Recipe) -> User | None:
    query = select(User).where(User.id == recipe.user_id)
    user = await db.execute(query)
    user = user.first()[0]
    creator_username = user.username
    return creator_username


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


async def recipe_to_schema(recipe: Recipe) -> RecipeWithAdditionalDataSchema:
    result = RecipeWithAdditionalDataSchema(
        id=recipe.id,
        name=recipe.name,
        description=recipe.description,
        icon_path=recipe.icon_path,
        rating=round(recipe.rating, 2) if recipe.rating is not None else 0,
        reviews=len(recipe.users_ratings) if recipe.users_ratings is not None else 0,
        user_id=recipe.user_id,
        category_id=recipe.category_id,
        tag_id=recipe.tag_id,
        preparing_time=recipe.preparing_time,
        cooking_time=recipe.cooking_time,
        waiting_time=recipe.waiting_time,
        total_time=recipe.total_time,
        ingredients=recipe.ingredients,
        steps=recipe.steps,
        comments=recipe.comments,
        nutritional_value=recipe.nutritional_value,
        proteins_value=recipe.proteins_value,
        fats_value=recipe.fats_value,
        carbohydrates_value=recipe.carbohydrates_value,
        dishes=recipe.dishes,
        video_link=recipe.video_link,
        source=recipe.source,
        is_private=recipe.is_private
    )
    return result


async def get_result_schema(
        db: AsyncSession,
        recipe: Recipe,
        current_user: User,
        my_recipe: MyRecipe = None
) -> RecipeWithAdditionalDataSchema:
    recipe_not_null = False
    if my_recipe is None:
        query = select(MyRecipe).where(MyRecipe.recipe_id == recipe.id).where(MyRecipe.user_id == current_user.id)
        my_recipe = await db.execute(query)
        my_recipe = my_recipe.first()
    else:
        recipe_not_null = True

    creator_username = await get_creator_username(db=db, recipe=recipe)
    tag = await get_tag_by_recipe(db=db, recipe=recipe)
    category = await get_category_by_recipe(db=db, recipe=recipe)

    result_schema = await recipe_to_schema(recipe)
    if my_recipe is None:
        result_schema.is_my_recipe = False
        result_schema.is_favorite = False
    else:
        result_schema.is_my_recipe = True
        if recipe_not_null:
            result_schema.is_favorite = my_recipe.is_favourite
        else:
            result_schema.is_favorite = my_recipe[0].is_favourite
    result_schema.creator_username = creator_username
    result_schema.tag_name = tag.name
    result_schema.category_name = category.name
    return result_schema
