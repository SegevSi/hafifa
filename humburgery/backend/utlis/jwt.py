from datetime import datetime, timedelta, timezone
from beanie import PydanticObjectId
from fastapi import HTTPException
from jose import jwt, JWTError
from config import conf
from schemas.token import TokenData


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, conf["jwt"]["SECRET_KEY"], algorithm=conf["jwt"]["ALGORITHM"])

    return encoded_jwt


def verify_token(token: str, credentials_exception: HTTPException) -> TokenData:
    try:
        payload = jwt.decode(token, conf["jwt"]["SECRET_KEY"], algorithms=[conf["jwt"]["ALGORITHM"]])
        username = payload.get("sub")
        user_id = payload.get("user_id")
        if username is None:
            raise credentials_exception

        return TokenData(username=username, user_id=PydanticObjectId(user_id))
    except JWTError:
        raise credentials_exception

