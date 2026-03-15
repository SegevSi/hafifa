from typing import Annotated, Optional
from pydantic import Field
from beanie import Document, Indexed, PydanticObjectId, BackLink


class User(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    name: Annotated[str, Indexed(unique=True)]
    password: str = Field(...)
    vote: Optional[BackLink['Vote']] = Field(original_field="user", default=None)

    class Settings:
        name = "users"
        keep_nulls = False