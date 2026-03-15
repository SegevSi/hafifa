from datetime import date
from typing import List, Optional
from beanie.odm.documents import DocumentProjectionType
from pydantic import Field, PositiveFloat, NonNegativeInt, BaseModel
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


class DishStatsDTO(BaseModel):
    id: PydanticObjectId = Field(..., alias="_id")
    name: str
    creator: str
    created_at: date
    updated_at: date
    votes: NonNegativeInt

