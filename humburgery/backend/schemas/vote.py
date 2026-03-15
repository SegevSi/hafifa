from beanie import PydanticObjectId
from pydantic import BaseModel
from .base import BaseResponse


class VoteRequest(BaseModel):
    dish_id: PydanticObjectId
    user_id: PydanticObjectId


class VoteResponse(VoteRequest, BaseResponse):
    pass