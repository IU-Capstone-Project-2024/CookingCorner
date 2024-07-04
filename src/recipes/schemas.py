from pydantic import BaseModel


class RecipePaginationSchema(BaseModel):
    id: int
    name: str
    description: str | None = None
    icon_path: str | None = None
    rating: float | None = None
    user_id: int | None = None
    category_id: int | None = None
    tag_id: int | None = None
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
    is_private: bool | None = None


class MyRecipePaginationSchema(BaseModel):
    recipe_id: int
    user_id: int
    is_favorite: bool
