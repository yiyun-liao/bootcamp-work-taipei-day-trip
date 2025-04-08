import jwt
import datetime
from typing import Dict

from dotenv import load_dotenv
import os

from fastapi import HTTPException, Request
from fastapi.security.utils import get_authorization_scheme_param

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

class AuthToken:
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
            raise HTTPException(
                status_code= 401,
                detail={"data": "Token has expired"}
            )
        except jwt.InvalidTokenError:
            raise HTTPException(
                status_code= 401,
                detail={"data": "Invalid token"}
            )
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail={"data": None}
            )
        
    def get_current_user_id(request:Request):
        authorization:str = request.headers.get("Authorization")
        scheme, token = get_authorization_scheme_param(authorization)
        if not token:
            raise HTTPException(
                status_code = 403,
                detail={"error": True, "message": "未登入系統"}
            )
        try:
            user_data = AuthToken.verify_jwt_token(token)
            userId = user_data['id']
            return userId
        except HTTPException as http_exc:
            print("get_current_user_id",http_exc)
            return None
        except Exception as e:
            print(f"Error:{e}")
            raise HTTPException(
                status_code=500,
                detail={
                    "error": True,
                    "message": "讀取資料錯誤"                
                }
            )