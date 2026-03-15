from datetime import date
from typing import Optional
from beanie import PydanticObjectId
from pydantic import BaseModel, PositiveFloat, Field, PositiveInt, ConfigDict
from .base import BaseResponse


class BaseDish(BaseModel):
    name: str
    creator: str


class DishRequest(BaseDish):
    price: PositiveFloat
    day_of_week: int = Field(..., ge=0, le=6)
    description: str


class DishResponse(DishRequest, BaseResponse):
    pass


class UpdateDish(BaseModel):
    name: Optional[str] = None
    creator: Optional[str] = None
    price: Optional[PositiveFloat] = None
    day_of_week: Optional[int] = Field(default=None, ge=0, le=6)
    description: Optional[str] = None


class DishStatResponse(BaseDish, BaseResponse):
    votes: PositiveInt
    created_at: date
    updated_at: date



