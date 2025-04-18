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


# add order ===========================================================================
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("ALTER TABLE booking_state ADD UNIQUE KEY unique_user (userId);")
#         db.commit()
#         print('success')


# show order ===========================================================================


# build order structure/table ===========================================================================
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("""CREATE TABLE order_table (
#             id INT AUTO_INCREMENT PRIMARY KEY,
#             order_number VARCHAR(50) UNIQUE,
#             userId INT,
#             status VARCHAR(10) NOT NULL,
#             attractionId INT,
#             attraction_name VARCHAR(255)  NOT NULL,
#             attraction_address VARCHAR(255),
#             attraction_image TEXT,
#             order_date VARCHAR(20),
#             order_time VARCHAR(10),
#             order_price INT  NOT NULL,
#             contact_name VARCHAR(100),
#             contact_email VARCHAR(100),
#             contact_phone VARCHAR(20),
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
#             FOREIGN KEY (userId) REFERENCES userData(id) ON DELETE SET NULL,
#             FOREIGN KEY (attractionId) REFERENCES attractions(id) ON DELETE SET NULL)
#             """)
#         db.commit()
#         print('success')