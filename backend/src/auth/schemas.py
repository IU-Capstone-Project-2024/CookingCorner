from typing import Optional

from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    email: str
    username: str
    name: str
    surname: str
    cooking_experience: int
    is_superuser: bool = False

    class Config:
        orm_mode = True


class UserCreate(schemas.BaseUserCreate):
    username: str
    name: str
    surname: str
    email: str
    password: str
    cooking_experience: int
    is_superuser: Optional[bool] = False
