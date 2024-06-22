from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.utils import get_current_user
from src.database import get_async_session
from src.models import Category, User

category_router = APIRouter(prefix="/categories", tags=["Category"])


@category_router.post("/get_all")
async def get_categories(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    query = select(Category).order_by(Category.name)
    categories = await db.execute(query)
    categories = [category[0].name for category in categories]
    return categories
