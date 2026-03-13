from datetime import date
from typing import Annotated, Optional

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

from beanie import Document, Indexed, PydanticObjectId, Link, BackLink


class User(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    name: Annotated[str, Indexed(unique=True)]
    password: str = Field(...)
    vote: Optional[BackLink["Vote"]] = None

    class Settings:
        name = "users"