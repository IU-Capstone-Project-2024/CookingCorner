from pydantic import BaseModel


class TagSchema(BaseModel):
    name: str

class TagUpdateSchema(BaseModel):
    old_name: str
    new_name: str
