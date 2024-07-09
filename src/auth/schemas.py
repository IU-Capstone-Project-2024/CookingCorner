from pydantic import BaseModel


class UserSchema(BaseModel):
    email: str | None = None
    username: str | None = None
    name: str | None = None
    surname: str | None = None
    cooking_experience: int | None = None
    image_path: str | None = None

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: str
    password: str


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    access_token_expires: str
    refresh_token_expires: str
