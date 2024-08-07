from datetime import timedelta, datetime

import jwt
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.schemas import UserCreate, UserSchema
from src.config import SECRET_AUTH
from src.database import get_async_session
from src.models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"

security = HTTPBearer()


async def get_user_by_username(db: AsyncSession, username: str):
    query = select(User).where(User.username == username)
    result = await db.execute(query)
    return result.first()


async def create_user(db: AsyncSession, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    query = insert(User).values(username=user.username, hashed_password=hashed_password)
    await db.execute(query)
    await db.commit()
    return {"status": "success"}


async def authenticate_user(username: str, password: str, db: AsyncSession):
    query = select(User).where(User.username == username)
    user = await db.execute(query)
    user = user.first()
    if user is None:
        return False
    user = user[0]
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user


async def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_AUTH, algorithm=ALGORITHM)
    return encoded_jwt


async def get_user_data(current_user: User):
    return UserSchema(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        name=current_user.name,
        surname=current_user.surname,
        cooking_experience=current_user.cooking_experience,
        image_path=current_user.image_path
    )


async def verify_token(db: AsyncSession, token: str = Depends(security)):
    try:
        payload = jwt.decode(token, SECRET_AUTH, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        query = select(User).where(User.id == user_id)
        user = await db.execute(query)
        user = user.first()[0]
        return user
    except Exception:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")


async def get_current_user(db: AsyncSession = Depends(get_async_session),
                           authorization: HTTPAuthorizationCredentials = Security(security)) -> User:
    try:
        token = authorization.credentials
        payload = jwt.decode(token, SECRET_AUTH, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        query = select(User).where(User.id == user_id)
        user = await db.execute(query)
        user = user.first()[0]
        return user
    except Exception:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")
