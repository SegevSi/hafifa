from pydantic import Field, BaseModel, ConfigDict
from beanie import Document, Indexed, PydanticObjectId, Link

# id: Optional[PydanticObjectId] = Field(default=None, alias="_id") todo delete comment
class Vote(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    dish: Link['Dish']
    user: Link['User']

    class Settings:
        name = "votes"
        keep_nulls = False
        use_state_management = True
        cascade = ["dish", "user"]


# from custom_types import PyObjectId
#
#
# class VoteModel(BaseModel):
#     id: PyObjectId = Field(alias="_id", default=None)
#     user_id: PyObjectId = Field(...)
#     dish_id: PyObjectId = Field(...)
#     model_config = ConfigDict(
#         populate_by_name=True,
#         arbitrary_types_allowed=True
#     )
