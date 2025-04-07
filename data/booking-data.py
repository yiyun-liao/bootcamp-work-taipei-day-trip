
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

# build user structure/table ===========================================================================
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("""CREATE TABLE booking_state (
#             id INT PRIMARY KEY AUTO_INCREMENT,
#             userId INT, 
#             attractionId INT ,
#             date DATE NOT NULL, 
#             time ENUM('morning', 'afternoon') NOT NULL,
#             price INT,
#             FOREIGN KEY (userId) REFERENCES userData(id) ON DELETE SET NULL,
#             FOREIGN KEY (attractionId) REFERENCES attractions(id) ON DELETE SET NULL)""")
#         db.commit()
#         print('success')
