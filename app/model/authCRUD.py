from fastapi import APIRouter,  HTTPException, Request, Depends
from fastapi.responses import JSONResponse
import mysql.connector
from fastapi.security import OAuth2PasswordBearer

from app.database import get_db_connection

class Auth:
    def user_sign_up(name, mail, password):
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute("INSERT INTO userData (userName, userMail, userPassword) VALUES (%s, %s, %s);",(name, mail, password))
                db.commit()       
                print(f"註冊成功 {mail} 已加入資料庫")
                return{ "ok": True }
            
    def user_sign_in(mail, password):
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM userData WHERE userMail=%s AND userPassword=%s;",(mail, password))
                userData = cursor.fetchone()
                print(userData)
                return userData