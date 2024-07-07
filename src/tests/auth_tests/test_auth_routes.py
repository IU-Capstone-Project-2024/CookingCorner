from contextlib import asynccontextmanager

from fastapi.testclient import TestClient

from src.auth.routes import auth_router

client_auth = TestClient(auth_router)
