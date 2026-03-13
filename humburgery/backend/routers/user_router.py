from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.token import Token
from services import user_service

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/login", response_model=Token)
async def login(form_data = Depends(OAuth2PasswordRequestForm)) -> Token:
    return await user_service.login(form_data.username, form_data.password)



@router.get("/current/vote")
async def get_current_user_vote():
    pass