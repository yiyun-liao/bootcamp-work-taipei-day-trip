import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
PASSWORD = os.getenv("PASSWORD")

def get_db_connection():
    return mysql.connector.connect(
        user="root",
        password=PASSWORD,
        host="localhost",
        database="website"
    )

with get_db_connection() as db:
        with db.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM member;")
            test = cursor.fetchall()
            print(test)