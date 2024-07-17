import os

from fastapi import File, UploadFile

from src.aws_init import s3
from src.config import IMAGE_PATH_DIR, BUCKET_NAME
from src.models import User


async def upload_image(current_user: User, file: UploadFile = File(...)) -> str:
    if file.content_type == 'image/png':
        with open(f"{IMAGE_PATH_DIR}/{current_user.id}.png", mode="wb") as f:
            f.write(await file.read())
        file_path = os.path.join(IMAGE_PATH_DIR, f"{current_user.id}.png")
        file_name = f"users/{current_user.id}.png"
    else:
        with open(f"{IMAGE_PATH_DIR}/{current_user.id}.jpg", mode="wb") as f:
            f.write(await file.read())
        file_path = os.path.join(IMAGE_PATH_DIR, f"{current_user.id}.jpg")
        file_name = f"users/{current_user.id}.jpg"
    s3.upload_file(file_path, BUCKET_NAME, file_name)
    return file_name
