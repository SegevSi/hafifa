import uvicorn
from fastapi import FastAPI
from database.connection import db_lifespan
from middlewares import ExceptionHandlerMiddleware, RequestLoggingMiddleware
from utlis.logger import setup_logging
from routers import user_router, dish_router, vote_router


setup_logging()
app = FastAPI(lifespan=db_lifespan)

app.include_router(user_router)
app.include_router(dish_router)
app.include_router(vote_router)

app.add_middleware(ExceptionHandlerMiddleware)
app.add_middleware(RequestLoggingMiddleware)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
