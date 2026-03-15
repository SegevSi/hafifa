from pymongo.asynchronous.database import AsyncDatabase
from starlette.requests import Request

from config import conf
from contextlib import asynccontextmanager
import logging
from fastapi import FastAPI
from pymongo import AsyncMongoClient
from beanie import init_beanie
from .models import User, Dish, Vote


logger = logging.getLogger(__name__)


async def init_db(db: AsyncDatabase) -> None:
   await init_beanie(db, document_models=[User, Vote, Dish])


# uri = "mongodb://<db_username>:<db_password>@<hostname>:<port>"
@asynccontextmanager
async def db_lifespan(app: FastAPI):
    uri = f"mongodb://{conf["mongodb"]["host"]}:{conf["mongodb"]["port"]}"
    app.mongodb_client = AsyncMongoClient(uri)
    app.database = app.mongodb_client.get_database(conf["mongodb"]["database"])
    ping_response = await app.database.command("ping")

    if int(ping_response["ok"]) != 1:
        raise Exception("Problem connecting to database.")
    else:
        logger.info("Connected to database cluster.")

    await init_db(app.database)
    logger.info("Database is initialized.")

    yield

    await app.mongodb_client.close()


def get_session(request: Request) -> AsyncMongoClient:
    return request.app.mongodb_client
