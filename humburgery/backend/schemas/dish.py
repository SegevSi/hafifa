from datetime import date
from typing import Optional
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


class UpdateDish(BaseModel):
    name: Optional[str] = None
    creator: Optional[str] = None
    price: Optional[PositiveFloat] = None
    day_of_week: Optional[int] = Field(default=None, ge=0, le=6)
    description: Optional[str] = None


class DishStatsResponse(DishResponse):
    votes: PositiveInt



