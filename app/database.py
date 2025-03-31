from fastapi import *
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
        database="taipei_attractions",
		connect_timeout=10  # 設定 10 秒超時
    )

# PASSWORD = os.getenv("MYSQL_LOCAL_PASSWORD")

# def get_db_connection():
#     return mysql.connector.connect(
#         user="root",
#         password=PASSWORD,
#         host="localhost",
#         database="taipei_attractions",
# 		connect_timeout=10 
#     )