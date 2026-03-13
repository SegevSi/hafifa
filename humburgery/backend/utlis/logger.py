import logging
from config import conf

def setup_logging() -> None:
    stream_handler = logging.StreamHandler()
    file_handler = logging.FileHandler(conf["logger"]["log_file"])

    logging.basicConfig(
        level=conf["logger"]["level"],
        format=conf["logger"]["format"],
        datefmt=conf["logger"]["datefmt"],
        handlers=[stream_handler, file_handler]
    )