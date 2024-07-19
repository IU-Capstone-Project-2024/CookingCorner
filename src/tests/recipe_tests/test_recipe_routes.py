from contextlib import asynccontextmanager

from fastapi.testclient import TestClient

from src.recipes.routes import recipe_router

client_recipe = TestClient(recipe_router)


@asynccontextmanager
async def test_get_recipe_by_id_correct_request():
    response = client_recipe.get(
        '/recipes/get_recipe_by_id?id=2'
    )
    assert response.status_code == 200


@asynccontextmanager
async def test_get_recent_recipes_correct_request():
    response = client_recipe.get(
        "/recipes/get_recent_recipes"
    )
    assert response.status_code == 200


@asynccontextmanager
async def test_get_my_recipes_correct_request():
    response = client_recipe.get(
        "/recipes/get_my_recipes"
    )
    assert response.status_code == 200


@asynccontextmanager
async def test_generate_recipe_correct_request():
    response = client_recipe.get(
        "/recipes/generate_recipe?url=https://www.olivemagazine.com/recipes/meat-and-poultry/the-full-works-burger/",
    )
    assert response.status_code == 200


@asynccontextmanager
async def test_generate_text_correct_request():
    response = client_recipe.get(
        "/recipes/generate_recipe?prompt=Hello"
    )
    assert response.status_code == 200
