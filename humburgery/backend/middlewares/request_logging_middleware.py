import logging
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


logger = logging.getLogger(__name__)

# todo: change logs or other middleware and make them better the message more understandable and check what is extra
class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()

        method = request.method
        path = request.url.path
        client_ip = request.client.host if request.client else "unknown"

        logger.info(f"Request started: {method} {path} ")

        response = await call_next(request)

        duration_ms = (time.perf_counter() - start_time) * 1000

        if response.status_code >= 500:
            logger.error( f"Server error: {method} {path} - {response.status_code}")
        elif response.status_code >= 400:
            logger.warning(f"Client error: {method} {path} - {response.status_code}")
        else:
            logger.info(f"Success: {method} {path} - {response.status_code} ({duration_ms:.2f}ms)")

        return response