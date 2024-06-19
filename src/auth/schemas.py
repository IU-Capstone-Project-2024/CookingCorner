from pydantic import BaseModel


class UserRead(BaseModel):
    id: int
    email: str
    username: str
    name: str
    surname: str
    cooking_experience: int

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: str
    password: str


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
