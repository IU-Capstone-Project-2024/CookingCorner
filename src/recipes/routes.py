import base64
import io
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import FileResponse, Response
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import select, insert, delete, update, func
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import StreamingResponse

from src.auth.utils import get_current_user
from src.config import IMAGE_PATH_DIR
from src.database import get_async_session
from src.models import User, Recipe, Category
from src.models.recipes import MyRecipe, Tag
from src.recipes.schemas import RecipePaginationSchema, RecipeWithAdditionalDataSchema, RecipeFiltersSchema
from src.recipes.utils import get_category_by_name, get_tag_by_name, check_recipe_exists, get_recipe, \
    check_my_recipe_exists, \
    recipe_to_schema, get_category_by_recipe, get_tag_by_recipe, get_creator_username, get_result_schema, filter_query
from src.tags.schemas import RecipeSchema, RecipeUpdateSchema

recipe_router = APIRouter(prefix="/recipes", tags=["Recipe"])


@recipe_router.get("/get_by_id/{recipe_id}", response_model=RecipeWithAdditionalDataSchema | None)
async def get_recipe_by_id(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                           current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(db=db, recipe_id=recipe_id):
        raise HTTPException(status_code=404, detail="Recipe not found")
    query = select(Recipe).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    recipe = recipe.first()
    if recipe[0].is_private and recipe[0].user_id != current_user.id:
        raise HTTPException(status_code=400, detail="Recipe is private")
    recipe = recipe[0]

    result_schema = await get_result_schema(db=db, recipe=recipe, current_user=current_user)

    if current_user.recent_recipes is None:
        recent_recipes = [0] * 10
    else:
        recent_recipes = current_user.recent_recipes.copy()
    for i in range(len(recent_recipes) - 1, -1, -1):
        recent_recipes[i] = recent_recipes[i - 1]
    is_recipe_inside = False
    for i in range(len(recent_recipes)):
        if recent_recipes[i] == recipe_id:
            is_recipe_inside = True
        if is_recipe_inside:
            if i == len(recent_recipes) - 1:
                recent_recipes[i] = 0
            else:
                recent_recipes[i] = recent_recipes[i + 1]
    recent_recipes[0] = recipe_id
    current_user.recent_recipes = recent_recipes.copy()
    await db.commit()
    return result_schema


@recipe_router.get("/get_recent_recipes", response_model=list[RecipeWithAdditionalDataSchema] | None)
async def get_recent_recipes(db: AsyncSession = Depends(get_async_session),
                             current_user: User = Depends(get_current_user)):
    recent_recipes_ids = current_user.recent_recipes
    if recent_recipes_ids is None:
        return []
    recipes = []
    for recent_recipe_id in recent_recipes_ids:
        query = select(Recipe).where(Recipe.id == recent_recipe_id)
        recipe = await db.execute(query)
        recipe = recipe.first()
        if recipe is not None:
            result_schema = await get_result_schema(db=db, recipe=recipe[0], current_user=current_user)
            recipes.append(result_schema)
    return recipes


@recipe_router.delete("/delete_recent_recipes")
async def delete_recent_recipes(db: AsyncSession = Depends(get_async_session),
                                current_user: User = Depends(get_current_user)):
    current_user.recent_recipes = None
    await db.commit()
    return {"status": "success"}


# @recipe_router.get("/get_all", response_model=Page[RecipePaginationSchema])
# async def get_all(db: AsyncSession = Depends(get_async_session),
#                   current_user: User = Depends(get_current_user)):
#     query = select(Recipe).where(Recipe.is_private == False)
#     recipes = await paginate(db, query)
#
#     return recipes


@recipe_router.post("/get_my_recipes", response_model=list[RecipeWithAdditionalDataSchema] | None)
async def get_my_recipes(body: RecipeFiltersSchema, db: AsyncSession = Depends(get_async_session),
                         current_user: User = Depends(get_current_user)):
    query = select(MyRecipe).where(MyRecipe.user_id == current_user.id)
    my_recipes = await db.execute(query)
    recipes = []
    for my_recipe in my_recipes:
        query = select(Recipe).where(my_recipe[0].recipe_id == Recipe.id)

        query = await filter_query(db=db, recipe_id=my_recipe[0].recipe_id, body=body, query=query,
                                   current_user=current_user)
        if query is None:
            continue

        recipe = await db.execute(query)
        recipe = recipe.first()
        if recipe is not None:
            result_schema = await get_result_schema(db=db, recipe=recipe[0], current_user=current_user,
                                                    my_recipe=my_recipe[0])
            recipes.append(result_schema)
    if not body.ascending_order:
        recipes.reverse()
    return recipes


@recipe_router.get("/get_by_tag/{tag_name}", response_model=list[RecipeWithAdditionalDataSchema] | None)
async def get_by_tag(tag_name: str, db: AsyncSession = Depends(get_async_session),
                     current_user: User = Depends(get_current_user)):
    tag = await get_tag_by_name(db=db, user_id=current_user.id, tag_name=tag_name)
    if tag is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    query = select(Recipe).where(Recipe.tag_id == tag.id)
    recipes = await db.execute(query)
    recipes = recipes.all()
    result = []
    for recipe in recipes:
        if recipe is not None:
            result_schema = await get_result_schema(db=db, recipe=recipe[0], current_user=current_user)
            result.append(result_schema)
    result.reverse()
    return result


@recipe_router.get("/get_by_category/{category_name}", response_model=list[RecipeWithAdditionalDataSchema] | None)
async def get_by_category(category_name: str, db: AsyncSession = Depends(get_async_session),
                          current_user: User = Depends(get_current_user)):
    category = await get_category_by_name(db=db, category_name=category_name)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    query = select(Recipe).where(Recipe.category_id == category.id)
    recipes = await db.execute(query)
    recipes = recipes.all()
    result = []
    for recipe in recipes:
        if recipe is not None:
            result_schema = await get_result_schema(db=db, recipe=recipe[0], current_user=current_user)
            result.append(result_schema)
    result.reverse()
    return result


@recipe_router.post("/get_by_name", response_model=list[RecipeWithAdditionalDataSchema] | None)
async def get_by_name(name: str, body: RecipeFiltersSchema, db: AsyncSession = Depends(get_async_session),
                      current_user: User = Depends(get_current_user)):
    query = select(Recipe).where(Recipe.name.ilike('%' + name + '%'))
    recipes = await db.execute(query)
    recipes = recipes.all()
    if recipes is None:
        raise HTTPException(status_code=404, detail="Recipes with such name not found")
    result = []
    for recipe in recipes:
        query = select(Recipe)
        query = await filter_query(db=db, recipe_id=recipe[0].id, body=body, query=query,
                                   current_user=current_user)
        if query is None:
            continue
        query_result = await db.execute(query)
        if query_result.first() is None:
            continue
        if not recipe[0].is_private:
            result_schema = await get_result_schema(db=db, recipe=recipe[0], current_user=current_user)
            result.append(result_schema)
    if len(result) == 0:
        return None
    if not body.ascending_order:
        result.reverse()
    return result


@recipe_router.get("/get_best_rated", response_model=list[RecipeWithAdditionalDataSchema] | None)
async def get_best_rated(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    query = (select(Recipe)
             .where(Recipe.is_private == False)
             .order_by(Recipe.rating.desc())
             .order_by(Recipe.users_ratings_count.desc())
             .limit(10))
    recipes = await db.execute(query)
    recipes = recipes.all()
    result = []
    for recipe in recipes:
        if recipe is not None:
            result_schema = await get_result_schema(db=db, recipe=recipe[0], current_user=current_user)
            result.append(result_schema)
    return result


@recipe_router.post("/rate_recipe")
async def rate_recipe(recipe_id: int, rating: int, db: AsyncSession = Depends(get_async_session),
                      current_user: User = Depends(get_current_user)):
    query = select(Recipe).where(Recipe.is_private == False).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    recipe = recipe.first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    recipe = recipe[0]
    users_ratings = {}
    if recipe.users_ratings is not None:
        users_ratings = recipe.users_ratings.copy()
    current_rating = recipe.rating if recipe.rating is not None else 0
    rating_sum = current_rating * len(users_ratings)
    if str(current_user.id) in users_ratings:
        rating_sum -= users_ratings[str(current_user.id)]
    users_ratings[str(current_user.id)] = rating
    rating_sum += rating
    recipe.rating = rating_sum / len(users_ratings)
    recipe.users_ratings = users_ratings.copy()
    if recipe.users_ratings_count is None:
        recipe.users_ratings_count = 0
    recipe.users_ratings_count += 1
    await db.commit()
    return {"status": "success"}


@recipe_router.post("/create")
async def create_recipe(body: RecipeSchema, db: AsyncSession = Depends(get_async_session),
                        current_user: User = Depends(get_current_user)):
    category = await get_category_by_name(db=db, category_name=body.category_name)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    if body.tag_name is not None:
        tag = await get_tag_by_name(db=db, tag_name=body.tag_name, user_id=current_user.id)
        if tag is None:
            raise HTTPException(status_code=404, detail="Tag not found")
    else:
        tag = None

    creation_time = datetime.now()
    query = insert(Recipe).values(
        name=body.name,
        description=body.description,
        icon_path=body.icon_path,
        rating=0.0,
        category_id=category.id,
        tag_id=tag.id if tag is not None else None,
        user_id=current_user.id,
        preparing_time=body.preparing_time,
        cooking_time=body.cooking_time,
        waiting_time=body.waiting_time,
        total_time=body.total_time,
        ingredients=body.ingredients.copy() if body.ingredients is not None else None,
        steps=body.steps.copy() if body.steps is not None else None,
        portions=body.portions if body.portions is not None else None,
        comments=body.comments,
        nutritional_value=body.nutritional_value,
        proteins_value=body.proteins_value,
        fats_value=body.fats_value,
        carbohydrates_value=body.carbohydrates_value,
        dishes=body.dishes,
        video_link=body.video_link,
        source=body.source,
        creation_time=creation_time
    )

    await db.execute(query)
    await db.flush()
    query = select(Recipe).where(
        Recipe.name == body.name,
        Recipe.description == body.description,
        Recipe.icon_path == body.icon_path,
        Recipe.category_id == category.id,
        Recipe.user_id == current_user.id,
        Recipe.preparing_time == body.preparing_time,
        Recipe.cooking_time == body.cooking_time,
        Recipe.waiting_time == body.waiting_time,
        Recipe.total_time == body.total_time,
        Recipe.portions == body.portions,
        Recipe.comments == body.comments,
        Recipe.nutritional_value == body.nutritional_value,
        Recipe.proteins_value == body.proteins_value,
        Recipe.fats_value == body.fats_value,
        Recipe.carbohydrates_value == body.carbohydrates_value,
        Recipe.dishes == body.dishes,
        Recipe.video_link == body.video_link,
        Recipe.source == body.source,
        Recipe.creation_time == creation_time
    )
    recipe = await db.execute(query)
    recipe = recipe.first()[0]

    query = insert(MyRecipe).values(
        recipe_id=recipe.id,
        user_id=current_user.id
    )
    await db.execute(query)
    await db.commit()

    return {"status": "success"}


@recipe_router.put("/update")
async def update_recipe(body: RecipeUpdateSchema,
                        db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    recipe = await get_recipe(db=db, recipe_id=body.id, user_id=current_user.id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found or it belongs to other user")
    if body.category_name is not None:
        category = await get_category_by_name(db=db, category_name=body.category_name)
        if category is None:
            raise HTTPException(status_code=404, detail="Category not found")
        category_id = category.id
    else:
        category_id = recipe.category_id
    if body.tag_name is not None:
        tag = await get_tag_by_name(db=db, tag_name=body.tag_name, user_id=current_user.id)
        if tag is None:
            raise HTTPException(status_code=404, detail="Tag not found")
        tag_id = tag.id
    else:
        tag_id = recipe.tag_id
    query = update(Recipe).where(Recipe.user_id == current_user.id).where(Recipe.id == body.id).values(
        name=body.name if body.name is not None else recipe.name,
        description=body.description if body.description is not None else recipe.description,
        icon_path=body.icon_path if body.icon_path is not None else recipe.icon_path,
        rating=body.rating if body.rating is not None else recipe.rating,
        category_id=category_id,
        tag_id=tag_id,
        preparing_time=body.preparing_time if body.preparing_time is not None else recipe.preparing_time,
        cooking_time=body.cooking_time if body.cooking_time is not None else recipe.cooking_time,
        waiting_time=body.waiting_time if body.waiting_time is not None else recipe.waiting_time,
        total_time=body.total_time if body.total_time is not None else recipe.total_time,
        ingredients=body.ingredients if body.ingredients is not None else recipe.ingredients,
        steps=body.steps if body.steps is not None else recipe.steps,
        portions=body.portions if body.portions is not None else recipe.portions,
        comments=body.comments if body.comments is not None else recipe.comments,
        nutritional_value=body.nutritional_value if body.nutritional_value is not None else recipe.nutritional_value,
        proteins_value=body.proteins_value if body.proteins_value is not None else recipe.proteins_value,
        fats_value=body.fats_value if body.fats_value is not None else recipe.fats_value,
        carbohydrates_value=body.carbohydrates_value if body.carbohydrates_value is not None
        else recipe.carbohydrates_value,
        dishes=body.dishes if body.dishes is not None else recipe.dishes,
        video_link=body.video_link if body.video_link is not None else recipe.video_link,
        source=body.source if body.source is not None else recipe.source
    )
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


# @recipe_router.delete("/delete")
# async def delete_recipe(recipe_id: int, db: AsyncSession = Depends(get_async_session),
#                         current_user: User = Depends(get_current_user)):
#     if not await check_recipe_exists(recipe_id=recipe_id, db=db, user_id=current_user.id):
#         raise HTTPException(status_code=404, detail="Recipe not found or it belongs to another user")
#     query = select(Recipe).where(Recipe.user_id == current_user.id).where(Recipe.id == recipe_id)
#     recipe = await db.execute(query)
#     recipe = recipe.first()
#     if not recipe[0].is_private:
#         raise HTTPException(status_code=400, detail="Recipe is published, so it cannot be deleted")
#     query = delete(Recipe).where(Recipe.user_id == current_user.id).where(Recipe.id == recipe_id)
#     await db.execute(query)
#     query = delete(MyRecipe).where(MyRecipe.user_id == current_user.id).where(MyRecipe.id == recipe_id)
#     await db.execute(query)
#     await db.commit()
#     return {"status": "success"}


@recipe_router.put("/publish/{recipe_id}")
async def publish(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                  current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(recipe_id=recipe_id, db=db, user_id=current_user.id):
        raise HTTPException(status_code=404, detail="Recipe not found or it belongs to another user")
    query = update(Recipe).where(Recipe.user_id == current_user.id).where(Recipe.id == recipe_id).values(
        is_private=False
    )
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@recipe_router.post("/add_to_my_recipes")
async def add_to_my_recipes(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                            current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(recipe_id=recipe_id, db=db):
        raise HTTPException(status_code=404, detail="Recipe not found")
    query = select(Recipe).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    recipe = recipe.first()[0]
    if recipe.is_private:
        raise HTTPException(status_code=400, detail="Recipe is private and cannot be added to my recipes")
    query = select(MyRecipe).where(MyRecipe.recipe_id == recipe_id).where(MyRecipe.user_id == current_user.id)
    my_recipe = await db.execute(query)
    if my_recipe.first() is not None:
        raise HTTPException(status_code=400, detail="Recipe already in my recipes")
    query = insert(MyRecipe).values(
        recipe_id=recipe.id,
        user_id=current_user.id
    )
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@recipe_router.delete("/delete_from_my_recipes")
async def delete_from_my_recipes(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                                 current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(recipe_id=recipe_id, db=db):
        raise HTTPException(status_code=404, detail="Recipe not found")
    query = select(Recipe).where(Recipe.id == recipe_id)
    recipe = await db.execute(query)
    recipe = recipe.first()[0]

    query = select(MyRecipe).where(MyRecipe.recipe_id == recipe_id).where(MyRecipe.user_id == current_user.id)
    my_recipe = await db.execute(query)
    my_recipe = my_recipe.first()
    if my_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found in my recipes")
    if recipe.user_id == current_user.id:
        if not recipe.is_private:
            raise HTTPException(status_code=400, detail="Recipe is public and cannot be deleted")
        query = delete(Recipe).where(Recipe.id == recipe_id)
        await db.execute(query)
    query = delete(MyRecipe).where(MyRecipe.user_id == current_user.id).where(MyRecipe.recipe_id == recipe_id)
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@recipe_router.post("/add_to_favourites")
async def add_to_favourites(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                            current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(recipe_id=recipe_id, db=db):
        raise HTTPException(status_code=404, detail="Recipe not found")
    if not await check_my_recipe_exists(recipe_id=recipe_id, db=db, user_id=current_user.id):
        raise HTTPException(status_code=404, detail="Recipe not found in my recipes")
    query = update(MyRecipe).where(MyRecipe.user_id == current_user.id).where(MyRecipe.recipe_id == recipe_id).values(
        is_favourite=True
    )
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@recipe_router.delete("/remove_from_favourites")
async def remove_from_favourites(recipe_id: int, db: AsyncSession = Depends(get_async_session),
                                 current_user: User = Depends(get_current_user)):
    if not await check_recipe_exists(recipe_id=recipe_id, db=db):
        raise HTTPException(status_code=404, detail="Recipe not found")
    if not await check_my_recipe_exists(recipe_id=recipe_id, db=db, user_id=current_user.id):
        raise HTTPException(status_code=404, detail="Recipe not found in my recipes")
    query = update(MyRecipe).where(MyRecipe.user_id == current_user.id).where(MyRecipe.recipe_id == recipe_id).values(
        is_favourite=False
    )
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@recipe_router.post("/upload_file")
async def upload_file(file: UploadFile, db: AsyncSession = Depends(get_async_session),
                      current_user: User = Depends(get_current_user)):
    with open(f"{IMAGE_PATH_DIR}/1.jpg", mode="wb") as f:
        f.write(await file.read())
    return file


@recipe_router.get("/get_file")
async def get_file(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    return FileResponse(f"{IMAGE_PATH_DIR}/1.jpg")
