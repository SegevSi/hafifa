from typing import Annotated
from pydantic import Field
from beanie import Document, Indexed, PydanticObjectId, Link


class Vote(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    dish: Link['Dish']
    user: Annotated[Link['User'], Indexed(unique=True)]

    class Settings:
        name = "votes"
        keep_nulls = False

