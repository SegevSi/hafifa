from datetime import date
from beanie import PydanticObjectId
from pydantic import BaseModel, PositiveFloat, Field, PositiveInt, ConfigDict


class DishRequest(BaseModel):
    name: str
    creator: str
    price: PositiveFloat
    day_of_week: int = Field(..., ge=0, le=6)
    description: str


class DishResponse(DishRequest):
    id: PydanticObjectId
    created_at: date
    updated_at: date

    model_config = ConfigDict(arbitrary_types_allowed=True, from_attributes=True)


class DishStatsResponse(DishResponse):
    votes: PositiveInt



