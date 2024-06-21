FROM python:3.10

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY src/main.py main.py

COPY src src

COPY static static

COPY alembic.ini alembic.ini

COPY migrations migrations

COPY .env .env

VOLUME /static

# RUN chmod +x docker/entrypoint.sh

# COPY docker/entrypoint.sh ./

# ENTRYPOINT ["./entrypoint.sh"]
