from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import logging
from exceptions import NotFoundException, ConflictException, AuthorizationException
from starlette import status


logger = logging.getLogger(__name__)


class ExceptionHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        headers = None

        try:
            response = await call_next(request)

            return response
        except HTTPException as e:
            status_code = e.status_code
            detail = e.detail
            headers = e.headers
        except NotFoundException as e:
            status_code = status.HTTP_404_NOT_FOUND
            detail = str(e)
        except ConflictException as e:
            status_code = status.HTTP_409_CONFLICT
            detail = str(e)
        except AuthorizationException as e:
            status_code = status.HTTP_403_FORBIDDEN
            detail = str(e)
        except Exception as e:
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            detail = str(e)

        if status_code >= 500:
            logger.error(f"Server error: {detail}")
        else:
            logger.warning(f"Client error: {detail}")


        return JSONResponse(status_code=status_code, content={"detail": detail}, headers=headers)