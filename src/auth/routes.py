from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy import update, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.schemas import UserCreate, TokenSchema, UserSchema
from src.auth.utils import get_user_by_username, create_user, authenticate_user, create_access_token, verify_token, \
    get_user_data, get_current_user
from src.config import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES
from src.database import get_async_session
from src.models import User

router = APIRouter(tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_async_session)):
    db_user = await get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return await create_user(db=db, user=user)


@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                                 db: AsyncSession = Depends(get_async_session)):
    user = await authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    refresh_token = await create_access_token(
        data={"sub": user.username}, expires_delta=refresh_token_expires
    )
    return TokenSchema(access_token=access_token, refresh_token=refresh_token, token_type="bearer")


@router.get("/verify-token/{token}")
async def verify_user_token(token: str):
    await verify_token(token=token)
    return {"message": "Token is valid"}


@router.post("/get_User/me")
async def get_user_me(db: AsyncSession = Depends(get_async_session), current_user: User = Depends(get_current_user)):
    return await get_user_data(current_user=current_user)


@router.post("/edit_user_data")
async def edit_user_data(body: UserSchema, db: AsyncSession = Depends(get_async_session),
                         current_user: User = Depends(get_current_user)):
    if body.username is not None:
        if current_user.username != body.username:
            query = select(User).where(User.username == body.username)
            user = await db.execute(query)
            if user.first() is not None:
                raise HTTPException(status_code=400, detail="Username already exists")
    username = body.username if body.username else current_user.username
    query = update(User).where(User.id == current_user.id).values(
        email=body.email,
        username=username,
        name=body.name,
        surname=body.surname,
        cooking_experience=body.cooking_experience,
        image_path=body.image_path
    )
    await db.execute(query)
    await db.commit()
    return {"status": "success"}

