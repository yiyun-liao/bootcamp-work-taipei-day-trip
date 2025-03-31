from fastapi import APIRouter,  HTTPException, Request
from fastapi.responses import JSONResponse
from app.database import get_db_connection
import mysql.connector

router = APIRouter()

@router.post("/api/user")
async def create_new_user(request:Request):
    body = await request.json()
    print(body)
    name = body.get('name')
    mail = body.get('email')
    password = body.get('password')

    if not name or not mail or not password:
        return JSONResponse(
            content={ "error": True, "message": "請按照情境提供對應的錯誤訊息"},
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