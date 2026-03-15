from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict


class VoteRequest(BaseModel):
    dish_id: PydanticObjectId


class VoteResponse(VoteRequest):
    id: PydanticObjectId


    model_config = ConfigDict(arbitrary_types_allowed=True, from_attributes=True)