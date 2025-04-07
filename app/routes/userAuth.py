from fastapi import APIRouter,  HTTPException, Request, Depends
from fastapi.responses import JSONResponse
import mysql.connector
from fastapi.security import OAuth2PasswordBearer

from app.database import get_db_connection
from app.model.auth import Auth
from app.model.auth_token import AuthToken


router = APIRouter()

@router.post("/api/user")
async def sign_up(request:Request):
    body = await request.json()
    # print(body)
    name = body.get('name')
    mail = body.get('email')
    password = body.get('password')

    if not name or not mail or not password:
        return JSONResponse(
            content={ "error": True, "message": "提供資料有少"},
            status_code=400
        )
    try:
        signup_is_success = Auth.user_sign_up(name, mail, password)
        if signup_is_success:
            return{ "ok": True }
    except mysql.connector.IntegrityError as e:
        print(f"註冊失敗")
        return JSONResponse(
            content={ "error": True, "message": "註冊失敗，資料匯入有錯誤"},
            status_code=400
        )
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
            "error": True,
            "message": "註冊失敗"
            }
        )
    


@router.put("/api/user/auth")
async def sign_in(request:Request):
    body = await request.json(); 
    # print(body)
    mail = body.get('email')
    password = body.get('password')        
    if not mail or not password:
        return JSONResponse(
            content={ "error": True, "message": "提供資料有少"},
            status_code=400
        )
    try:
        success_signin = Auth.user_sign_in(mail, password)
        if not success_signin:
            print("登入失敗")
            return JSONResponse(content={ "error": True, "message": "登入失敗，帳號或密碼錯誤"}, status_code=400)     
        token = AuthToken.create_jwt_token({
            "mail":success_signin['userMail'],
            "name":success_signin['userName'],
            "id":success_signin['id']
        })
        return {"token":token}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "登入失敗"
            }
        )


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/api/user/auth")
async def get_user_auth(token:str = Depends(oauth2_scheme)):
    try:
        user_data = AuthToken.verify_jwt_token(token)
        data ={
            "id":user_data['id'],
            "name":user_data['name'],
            "email":user_data['sub']
        }
        if user_data:
            return {"data":data}
    except HTTPException as http_exc:
        # 讓 FastAPI 正確回傳 401 錯誤
        print(http_exc)
        return None
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "資料取得失敗"
            }
        )