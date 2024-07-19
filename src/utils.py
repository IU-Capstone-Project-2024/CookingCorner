import os
import uuid

from fastapi import File, UploadFile

from src.aws_init import s3
from src.config import IMAGE_PATH_DIR, BUCKET_NAME


async def upload_image(folder: str, file: UploadFile = File(...)) -> str:
    image_id = uuid.uuid4()
    while not await check_uuid_is_available(folder=folder, image_id=image_id, content_type=file.content_type):
        image_id = uuid.uuid4()
    if file.content_type == 'image/png':
        with open(f"{IMAGE_PATH_DIR}/{image_id}.png", mode="wb") as f:
            f.write(await file.read())
        file_path = os.path.join(IMAGE_PATH_DIR, f"{image_id}.png")
        file_name = f"{folder}/{image_id}.png"
    else:
        with open(f"{IMAGE_PATH_DIR}/{image_id}.png", mode="wb") as f:
            f.write(await file.read())
        file_path = os.path.join(IMAGE_PATH_DIR, f"{image_id}.jpg")
        file_name = f"{folder}/{image_id}.jpg"
    s3.upload_file(file_path, BUCKET_NAME, file_name)
    await remove_redundant_files()
    return file_name


async def check_uuid_is_available(folder: str, image_id: uuid.UUID, content_type: str) -> bool:
    if content_type == 'image/png':
        file_path = os.path.join(folder, f"{image_id}.png")
    else:
        file_path = os.path.join(folder, f"{image_id}.jpg")
    try:
        s3.get_object(Bucket=BUCKET_NAME, Key=file_path)
        return False
    except Exception:
        return True


async def remove_redundant_files():
    for file in os.listdir(IMAGE_PATH_DIR):
        os.remove(os.path.join(IMAGE_PATH_DIR, file))
