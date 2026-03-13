from datetime import date

from pydantic import Field, BaseModel, ConfigDict
from .custom_types import PyObjectId


class UserModel(BaseModel):
    id: PyObjectId = Field(alias="_id", default=None)
    name: str = Field(...)
    password: str = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )

