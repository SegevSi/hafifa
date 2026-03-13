from pymongo.asynchronous.database import AsyncDatabase
from starlette.requests import Request
from config import conf
from contextlib import asynccontextmanager
import logging
from fastapi import FastAPI
from pymongo import AsyncMongoClient


logger = logging.getLogger(__name__)

# todo: make it better with the async with gather or make helper func
async def init_db(db: AsyncDatabase) -> None:
    await db["users"].create_index("name", unique=True)
    await db["votes"].create_index("user_id", unique=True)


# instead of using url create the url when u have db that need password and user
# uri = "mongodb://<db_username>:<db_password>@<hostname>:<port>"
@asynccontextmanager
async def db_lifespan(app: FastAPI):
    app.mongodb_client = AsyncMongoClient(conf["mongodb"]["uri"])
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


def get_db(request: Request) -> AsyncDatabase:
    return request.app.database
