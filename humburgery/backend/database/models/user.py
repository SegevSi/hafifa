from typing import Annotated, Optional, TYPE_CHECKING
from pydantic import Field, BaseModel, ConfigDict
from beanie import Document, Indexed, PydanticObjectId, Link, BackLink


if TYPE_CHECKING:
    from .vote import Vote


class User(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    name: Annotated[str, Indexed(unique=True)]
    password: str = Field(...)
    vote: Optional[BackLink['Vote']] = Field(original_field="user", default=None)

    class Settings:
        name = "users"
        keep_nulls = False


# from .custom_types import PyObjectId
#
#
# class UserModel(BaseModel):
#     id: PyObjectId = Field(alias="_id", default=None)
#     name: str = Field(...)
#     password: str = Field(...)
#     model_config = ConfigDict(
#         populate_by_name=True,
#         arbitrary_types_allowed=True
#     )