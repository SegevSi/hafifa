from datetime import date

from pydantic import Field, BaseModel, ConfigDict
from custom_types import PyObjectId


class VoteModel(BaseModel):
    id: PyObjectId = Field(alias="_id", default=None)
    user_id: PyObjectId = Field(...)
    dish_id: PyObjectId = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )

