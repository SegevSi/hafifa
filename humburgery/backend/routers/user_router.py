from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.token import Token, TokenData
from schemas.vote import VoteResponse
from services import user_service
from utlis.oauth2 import get_current_user

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/login", response_model=Token)
async def login(form_data = Depends(OAuth2PasswordRequestForm)) -> Token:
    return await user_service.login(form_data.username, form_data.password)



@router.get("/current/vote", response_model=VoteResponse)
async def get_current_user_vote(current_user: TokenData = Depends(get_current_user)) -> VoteResponse:
    return await user_service.get_user_vote(current_user.user_id)