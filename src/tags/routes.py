from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import insert, select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import get_current_user
from src.database import get_async_session
from src.models import User, Tag, Recipe
from src.tags.schemas import TagSchema, TagUpdateSchema

tag_router = APIRouter(prefix="/tags", tags=["Tag"])


@tag_router.get("/get_all")
async def get_tags(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    query = select(Tag).where(Tag.user_id == current_user.id).order_by(Tag.name)
    tags = await db.execute(query)
    tags = [tag[0].name for tag in tags]
    return tags


@tag_router.post("/create")
async def create_tag(body: TagSchema, db: AsyncSession = Depends(get_async_session),
                     current_user: User = Depends(get_current_user)):
    query = select(Tag).where(Tag.user_id == current_user.id).where(Tag.name == body.name)
    tag = await db.execute(query)
    if tag.first():
        raise HTTPException(status_code=400, detail="Tag already exists")
    query = insert(Tag).values(name=body.name, user_id=current_user.id)
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@tag_router.put("/update")
async def update_tag(body: TagUpdateSchema, db: AsyncSession = Depends(get_async_session),
                     current_user: User = Depends(get_current_user)):
    query = select(Tag).where(Tag.user_id == current_user.id).where(Tag.name == body.old_name)
    tag = await db.execute(query)
    if tag.first() is None:
        raise HTTPException(status_code=404, detail="Tag not found")
    query = update(Tag).where(Tag.name == body.old_name).where(Tag.user_id == current_user.id).values(
        name=body.new_name)
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


@tag_router.delete("/delete")
async def delete_tag(body: TagSchema, db: AsyncSession = Depends(get_async_session),
                     current_user: User = Depends(get_current_user)):
    query = select(Tag).where(Tag.user_id == current_user.id).where(Tag.name == body.name)
    tag = await db.execute(query)
    if tag.first() is None:
        return HTTPException(status_code=404, detail="Tag not found")
    query = select(Recipe).where(Tag.name == body.name)
    recipes = await db.execute(query)
    recipes = recipes.all()
    if recipes is not None:
        recipes_id = [recipe[0].id for recipe in recipes]
        for recipe_id in recipes_id:
            query = update(Recipe).where(Recipe.id == recipe_id).values(tag_id=None)
            await db.execute(query)
        await db.commit()
    query = delete(Tag).where(Tag.user_id == current_user.id).where(Tag.name == body.name)
    await db.execute(query)
    await db.commit()
    return {"status": "success"}
