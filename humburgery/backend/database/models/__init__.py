from .vote import Vote
from .dish import Dish, DishStatsDTO
from .user import User


Dish.model_rebuild()
User.model_rebuild()
Vote.model_rebuild()


