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
        host="35.75.244.94",
        database="taipei_attractions"
    )

# 測試 ec2 連線
db = get_db_connection()
cursor = db.cursor(dictionary=True)
cursor.execute(" SELECT id, name, mrt FROM attractions;")
data = cursor.fetchall()
print(data)
db.close()