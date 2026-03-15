from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict


class BaseResponse(BaseModel):
    id: PydanticObjectId

    model_config = ConfigDict(arbitrary_types_allowed=True, from_attributes=True)



