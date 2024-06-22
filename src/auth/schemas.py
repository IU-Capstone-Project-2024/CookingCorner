from pydantic import BaseModel


class UserRead(BaseModel):
    id: int
    email: str | None = None
    username: str
    name: str | None = None
    surname: str | None = None
    cooking_experience: int | None = None

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: str
    password: str


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
