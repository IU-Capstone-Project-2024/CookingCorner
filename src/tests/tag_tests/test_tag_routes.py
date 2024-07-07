from contextlib import asynccontextmanager

from fastapi.testclient import TestClient

from src.tags.routes import tag_router

client_tag = TestClient(tag_router)


@asynccontextmanager
async def test_get_tags_correct_request():
    response = client_tag.get(
        "/tags/get_all"
    )
    assert response.status_code == 200


@asynccontextmanager
async def test_create_tag_correct_request():
    response = client_tag.post(
        "/tags/create",
        json={
            "name": "breakfast"
        }
    )
    assert response.status_code == 200


@asynccontextmanager
async def test_update_tag_correct_request():
    response = client_tag.put(
        "/tags/update",
        json={
            "old_name": "breakfast",
            "new_name": "lunch"
        }
    )
    assert response.status_code == 200


@asynccontextmanager
async def test_delete_tag_correct_request():
    response = client_tag.delete(
        "/tags/delete/{1}"
    )
    assert response.status_code == 200
