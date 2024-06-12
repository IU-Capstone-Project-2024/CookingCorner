FROM python:3.10

RUN mkdir /CookingCorner

WORKDIR /CookingCorner

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod a+x docker/*.sh

#WORKDIR src
#
#CMD gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000
