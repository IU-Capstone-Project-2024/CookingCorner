from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, insert, delete, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import get_current_user
from src.database import get_async_session
from src.models import User, Recipe
from src.recipes.utils import get_category, get_tag, check_recipe_exists
from src.tags.schemas import RecipeSchema

recipe_router = APIRouter(prefix="/recipes", tags=["Recipe"])


@recipe_router.get("/get_by_id/{recipe_id}")
async def get_recipe_by_id(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                           current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(db=db, recipe_id=recipe_id):
        raise HTTPException(status_code=404, detail="Recipe not found")
    query = select(Recipe).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    return recipe.first()[0]


@recipe_router.get("/get_all")
async def get_all(db: AsyncSession = Depends(get_async_session),
                  current_user: User = Depends(get_current_user)):
    query = select(Recipe)
    recipes = await db.execute(query)
    recipes = [recipe[0] for recipe in recipes]
    return recipes


@recipe_router.get("/get_by_tag/{tag_name}")
async def get_by_tag(tag_name: str, db: AsyncSession = Depends(get_async_session),
                     current_user: User = Depends(get_current_user)):
    tag = await get_tag(db=db, user_id=current_user.id, tag_name=tag_name)
    if tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    query = select(Recipe).where(Recipe.tag_id == tag.id)
    recipes = await db.execute(query)
    recipes = recipes.all()
    recipes = [recipe[0] for recipe in recipes]
    return recipes


@recipe_router.get("/get_by_category/{category_name}")
async def get_by_category(category_name: str, db: AsyncSession = Depends(get_async_session),
                          current_user: User = Depends(get_current_user)):
    category = await get_category(db=db, category_name=category_name)
    if category is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    query = select(Recipe).where(Recipe.category_id == category.id)
    recipes = await db.execute(query)
    recipes = recipes.all()
    recipes = [recipe[0] for recipe in recipes]
    return recipes


@recipe_router.post("/create")
async def create_recipe(body: RecipeSchema, db: AsyncSession = Depends(get_async_session),
                        current_user: User = Depends(get_current_user)):
    category = await get_category(db=db, category_name=body.category_name)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    tag = await get_tag(db=db, tag_name=body.tag_name, user_id=current_user.id)
    if tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    query = insert(Recipe).values(
        name=body.name,
        description=body.description,
        icon_path=body.icon_path,
        rating=body.rating,
        category_id=category.id,
        tag_id=tag.id,
        user_id=current_user.id,
        preparing_time=body.preparing_time,
        cooking_time=body.cooking_time,
        waiting_time=body.waiting_time,
        total_time=body.total_time,
        portions=body.portions,
        ingredients=body.ingredients,
        how_to_cook=body.how_to_cook,
        images_paths=body.images_paths,
        comments=body.comments,
        nutritional_value=body.nutritional_value,
        proteins_value=body.proteins_value,
        fats_value=body.fats_value,
        carbohydrates_value=body.carbohydrates_value,
        dishes=body.dishes,
        video_link=body.video_link,
        source=body.source
    )
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@recipe_router.put("/update")
async def update_recipe(body: RecipeSchema,
                        db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(db=db, recipe_id=current_user.id):
        raise HTTPException(status_code=404, detail="Recipe not found")
    query = select(Tag).where(Tag.user_id == current_user.id).where(Tag.name == body.old_name)
    tag = await db.execute(query)
    if tag.first() is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    return


@recipe_router.delete("/delete")
async def delete_recipe(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                        current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(recipe_id=recipe_id, db=db):
        raise HTTPException(status_code=404, detail="Recipe not found")
    query = delete(Recipe).where(Recipe.id == recipe_id)
    await db.execute(query)
    await db.commit()
    return {"status": "success"}
