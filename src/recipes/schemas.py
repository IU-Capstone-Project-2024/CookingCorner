from pydantic import BaseModel


class RecipePaginationSchema(BaseModel):
    id: int
    name: str
    description: str
    icon_path: str
    rating: float
    user_id: int
    category_id: int
    tag_id: int
    preparing_time: int
    cooking_time: int
    waiting_time: int
    total_time: int
    portions: int
    ingredients: str
    how_to_cook: str
    images_paths: list[str]
    comments: str
    nutritional_value: float
    proteins_value: float
    fats_value: float
    carbohydrates_value: float
    dishes: str
    video_link: str
    source: str
    is_private: bool
