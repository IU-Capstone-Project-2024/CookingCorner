from fastapi.testclient import TestClient

from src.recipes.routes import recipe_router

client_auth = TestClient(recipe_router)
