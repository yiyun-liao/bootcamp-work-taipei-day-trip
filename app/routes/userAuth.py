from fastapi import APIRouter,  HTTPException, Request, Depends
from fastapi.responses import JSONResponse
import mysql.connector
from fastapi.security import OAuth2PasswordBearer

from app.database import get_db_connection

router = APIRouter()

@router.post("/api/user")
async def sign_out(request:Request):
    body = await request.json()
    print(body)
    name = body.get('name')
    mail = body.get('email')
    password = body.get('password')

    if not name or not mail or not password:
        return JSONResponse(
            content={ "error": True, "message": "提供資料有少"},
            status_code=400
        )
    try:
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute("INSERT INTO userData (userName, userMail, userPassword) VALUES (%s, %s, %s);",(name, mail, password))
                db.commit()       
                print(f"註冊成功 {mail} 已加入資料庫")
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
    from app.login_token import create_jwt_token

    body = await request.json(); 
    print(body)
    mail = body.get('email')
    password = body.get('password')        
    if not mail or not password:
        return JSONResponse(
            content={ "error": True, "message": "提供資料有少"},
            status_code=400
        )
    try:
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM userData WHERE userMail=%s AND userPassword=%s;",(mail, password))
                userData = cursor.fetchone()
                if not userData:
                    print("登入失敗")
                    return JSONResponse(content={ "error": True, "message": "登入失敗，帳號或密碼錯誤"}, status_code=400)     
                token = create_jwt_token({
                    "mail":userData['userMail'],
                    "name":userData['userName'],
                    "id":userData['id']
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
    from app.login_token import verify_jwt_token
    try:
        user_data = verify_jwt_token(token)
        data ={
            "id":user_data['id'],
            "name":user_data['name'],
            "email":user_data['sub']
        }
        if user_data:
            return {"data":data}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "資料取得失敗"
            }
        )