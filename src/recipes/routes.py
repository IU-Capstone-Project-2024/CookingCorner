from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import get_current_user
from src.database import get_async_session
from src.models import User

recipe_router = APIRouter(prefix="/recipes", tags=["Recipe"])


@recipe_router.post("/get_by_id")
async def get_recipe_by_id(db: AsyncSession = Depends(get_async_session),
                           current_user: User = Depends(get_current_user)):
    return


@recipe_router.post("/get_all")
async def get_all(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    return


@recipe_router.post("/create")
async def create_recipe(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    return


@recipe_router.post("/update")
async def update_recipe(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    return


@recipe_router.post("/delete")
async def delete_recipe(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    return
