from datetime import timedelta, datetime

import jwt
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.schemas import UserCreate, UserRead
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
    user = user.first()[0]
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user


async def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_AUTH, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_token(token: str = Depends(security)):
    try:
        payload = jwt.decode(token, SECRET_AUTH, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except Exception:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")


async def get_user_data(db: AsyncSession, token: str = Depends(security)):
    try:
        payload = jwt.decode(token, SECRET_AUTH, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        query = select(User).where(User.username == username)
        user = await db.execute(query)
        user = user.first()[0]
        return UserRead(
            id=user.id,
            email=user.email,
            username=user.username,
            name=user.name,
            surname=user.surname,
            cooking_experience=user.cooking_experience
        )
    except Exception:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")


async def get_current_user(authorization: HTTPAuthorizationCredentials = Security(security)) -> User:
    try:
        token = authorization.credentials
        payload = jwt.decode(token, SECRET_AUTH, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        query = select(User).where(User.username == username)
        db: AsyncSession = Depends(get_async_session)
        user = await db.execute(query)
        user = user.first()[0]
        return user
    except HTTPException:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")
