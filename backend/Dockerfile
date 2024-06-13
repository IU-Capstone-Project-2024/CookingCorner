FROM python:3.10

RUN mkdir /CookingCorner

WORKDIR /CookingCorner

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod a+x docker/*.sh

RUN alembic upgrade head

WORKDIR src

CMD gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000
