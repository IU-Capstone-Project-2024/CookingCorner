from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from src.auth.routes import router as auth_router
from src.categories.routes import category_router
from src.recipes.routes import recipe_router
from src.tags.routes import tag_router

app = FastAPI(
    title="Cooking Corner API"
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth_router)
app.include_router(category_router)
app.include_router(tag_router)
app.include_router(recipe_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
