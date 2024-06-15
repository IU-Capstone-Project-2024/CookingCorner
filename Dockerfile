FROM python:3.10

#RUN mkdir /CookingCorner
#
#WORKDIR /CookingCorner

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY src/main.py main.py

COPY src src

COPY static static

COPY alembic.ini alembic.ini

COPY migrations migrations

COPY .env .env

VOLUME /static

RUN alembic revision --autogenerate -m "Docker database creation"

#RUN chmod a+x docker/*.sh

# RUN alembic upgrade head

#WORKDIR src

#CMD uvicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000
