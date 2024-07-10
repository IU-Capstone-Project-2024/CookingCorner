#! /bin/sh

ollama serve &
sleep 10
ollama pull phi
alembic init alembic
alembic upgrade head
exec "$@"
