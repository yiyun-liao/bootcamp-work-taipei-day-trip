import jwt
import datetime
from typing import Dict

from dotenv import load_dotenv
import os

from fastapi import HTTPException


load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

def create_jwt_token(user_data: Dict):
    expiration = datetime.datetime.now() + datetime.timedelta(days=7)
    payload = {
        "sub": user_data['mail'],
        "name": user_data['name'],
        "id": user_data['id'],
        "exp":expiration
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_jwt_token(token:str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        return payload
    except jwt.ExpiredSignatureError:
        print('Token has expired')
        raise HTTPException(
            status_code= 401,
            content={"data": None}
        )
    except jwt.InvalidTokenError:
        print('Invalid token')
        raise HTTPException(
            status_code= 401,
            content={"data": None}
        )
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail={e}
        )