import redis
from os import getenv

def get_redis_conn():
    return redis.Redis(
        host=getenv('REDIS_HOST'), 
        port=int(getenv('REDIS_PORT')),  
        charset="utf-8", 
        decode_responses=True
    )

redis_conn = get_redis_conn()
