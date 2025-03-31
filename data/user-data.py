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

# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("""CREATE TABLE userData (
#             id INT PRIMARY KEY AUTO_INCREMENT,
#             userName VARCHAR(255) NOT NULL, 
#             userMail VARCHAR(255) NOT NULL UNIQUE,
#             userPassword VARCHAR(255) NOT NULL, 
#             createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)""")
#         db.commit()
#         print('success')

# local===========================================================================
# SECRET_KEY = os.getenv("SECRET_KEY")
# PASSWORD = os.getenv("MYSQL_LOCAL_PASSWORD")

# def get_db_connection():
#     return mysql.connector.connect(
#         user="root",
#         password=PASSWORD,
#         host="localhost",
#         database="taipei_attractions"
#     )

# build user structure/table ===========================================================================
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("""CREATE TABLE userData (
#             id INT PRIMARY KEY AUTO_INCREMENT,
#             userName VARCHAR(255) NOT NULL, 
#             userMail VARCHAR(255) NOT NULL,
#             userPassword VARCHAR(255) NOT NULL, 
#             createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)""")
#         db.commit()


# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("ALTER TABLE userData MODIFY COLUMN userMail VARCHAR(255) NOT NULL UNIQUE;")
#         db.commit()
