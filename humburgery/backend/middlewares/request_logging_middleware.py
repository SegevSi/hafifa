import logging
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()

        method = request.method
        path = request.url.path
        client_ip = request.client.host if request.client else "unknown"
        info = f"{method} {path} client: {client_ip}"

        logger.info(f"Request started: {info}")

        response = await call_next(request)

        duration_ms = (time.perf_counter() - start_time) * 1000
        info = f"{info} status: {response.status_code}"

        if response.status_code >= 500:
            logger.error( f"Server error: {info}")
        elif response.status_code >= 400:
            logger.warning(f"Client error: {info}")
        else:
            logger.info(f"Success: {info} time: {duration_ms:.2f}ms")

        return response