FROM python:3.15.0a7-slim-trixie
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . /app
EXPOSE 8000
ENTRYPOINT ["python", "main.py"]