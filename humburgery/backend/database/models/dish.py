from datetime import date
from typing import List, Optional
from pydantic import Field, BaseModel, ConfigDict, PositiveFloat, PositiveInt
from beanie import Document, before_event, Replace, Insert, Update, PydanticObjectId, BackLink


class Dish(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    name: str = Field(...)
    creator: str = Field(...)
    created_at: date = Field(default_factory=date.today)
    updated_at: date = Field(default_factory=date.today)
    description: str = Field(...)
    price: PositiveFloat = Field(...)
    day_of_week: int = Field(..., ge=0, le=6)
    votes: Optional[List[BackLink['Vote']]] = Field(original_field="dish", default=None)

    # todo: need insert?
    @before_event([Replace, Insert, Update])
    def update_handler(self):
        self.updated_at = date.today()

    class Settings:
        name = "dishes"
        keep_nulls = False


# from custom_types import PyObjectId


# class DishModel(BaseModel):
#     id: PyObjectId = Field(alias="_id", default=None)
#     name: str = Field(...)
#     creator: str = Field(...)
#     created_at: date = Field(default=date.today())
#     updated_at: date = Field(default=date.today())
#     price: PositiveFloat = Field(...)
#     day_of_week: int = Field(..., ge=0, le=6)
#     model_config = ConfigDict(
#         populate_by_name=True,
#         arbitrary_types_allowed=True
#     )
#
#
# class DishStatsModel(DishModel):
#     votes: PositiveInt = Field(...)
