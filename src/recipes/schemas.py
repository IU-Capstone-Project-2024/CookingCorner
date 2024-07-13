from pydantic import BaseModel


class RecipePaginationSchema(BaseModel):
    id: int
    name: str
    description: str | None = None
    icon_path: str | None = None
    rating: float | None = None
    reviews: int | None = None
    user_id: int | None = None
    category_id: int | None = None
    tag_id: int | None = None
    preparing_time: int | None = None
    cooking_time: int | None = None
    waiting_time: int | None = None
    total_time: int | None = None
    ingredients: list[dict] | None = None
    steps: list[dict] | None = None
    portions: int | None = None
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


class RecipeWithAdditionalDataSchema(RecipePaginationSchema):
    is_my_recipe: bool | None = None
    is_favorite: bool | None = None
    creator_username: bool | None = None
    category_name: str | None = None
    tag_name: str | None = None


class RecipeFiltersSchema(BaseModel):
    category_name: str | None = None
    is_favourite: bool | None = None
    ascending_order: bool | None = None


class RatingSchema(BaseModel):
    rating: float | None = None
