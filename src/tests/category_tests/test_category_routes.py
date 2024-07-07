from contextlib import asynccontextmanager

from fastapi.testclient import TestClient

from src.categories.routes import category_router

client_category = TestClient(category_router)


@asynccontextmanager
async def test_get_categories_correct_request():
    response = client_category.get(
        "/categories/get_all"
    )
    assert response.status_code == 200
