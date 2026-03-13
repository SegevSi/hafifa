from datetime import date

from pydantic import BaseModel, PositiveFloat, Field, PositiveInt


class DishRequest(BaseModel):
    name: str
    creator: str
    price: PositiveFloat
    day_of_week: int = Field(..., ge=0, le=6)
    description: str


class DishResponse(DishRequest):
    id: str
    created_at: date
    updated_at: date


class DishStatsResponse(DishResponse):
    votes: PositiveInt



