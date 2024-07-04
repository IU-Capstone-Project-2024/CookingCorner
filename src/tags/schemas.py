from pydantic import BaseModel


class TagSchema(BaseModel):
    name: str


class TagUpdateSchema(BaseModel):
    old_name: str
    new_name: str


class RecipeSchema(BaseModel):
    name: str
    description: str
    icon_path: str | None = None
    rating: float | None = None
    category_name: str | None = None
    tag_name: str | None = None
    preparing_time: int | None = None
    cooking_time: int | None = None
    waiting_time: int | None = None
    total_time: int | None = None
    portions: int | None = None
    ingredients: str | None = None
    how_to_cook: str | None = None
    images_paths: list[str] | None = None
    comments: str | None = None
    nutritional_value: float | None = None
    proteins_value: float | None = None
    fats_value: float | None = None
    carbohydrates_value: float | None = None
    dishes: str | None = None
    video_link: str | None = None
    source: str | None = None


class RecipeUpdateSchema(BaseModel):
    id: int
    name: str | None = None
    description: str | None = None
    icon_path: str | None = None
    rating: float | None = None
    category_name: str | None = None
    tag_name: str | None = None
    preparing_time: int | None = None
    cooking_time: int | None = None
    waiting_time: int | None = None
    total_time: int | None = None
    portions: int | None = None
    ingredients: str | None = None
    how_to_cook: str | None = None
    images_paths: list[str] | None = None
    comments: str | None = None
    nutritional_value: float | None = None
    proteins_value: float | None = None
    fats_value: float | None = None
    carbohydrates_value: float | None = None
    dishes: str | None = None
    video_link: str | None = None
    source: str | None = None
