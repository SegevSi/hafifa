from datetime import date
from typing import Annotated

from pydantic import Field, BaseModel, ConfigDict, PositiveFloat, PositiveInt
from custom_types import PyObjectId


class DishModel(BaseModel):
    id: PyObjectId = Field(alias="_id", default=None)
    name: str = Field(...)
    creator: str = Field(...)
    created_at: date = Field(default=date.today())
    updated_at: date = Field(default=date.today())
    price: PositiveFloat = Field(...)
    day_of_week: int = Field(..., ge=0, le=6)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )


class DishStatsModel(DishModel):
    votes: PositiveInt = Field(...)