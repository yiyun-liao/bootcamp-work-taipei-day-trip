import jwt
import datetime
from dotenv import load_dotenv
import os
from typing import Dict


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