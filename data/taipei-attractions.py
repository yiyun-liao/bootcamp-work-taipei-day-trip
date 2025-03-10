import mysql.connector
from dotenv import load_dotenv
import os
import json

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
PASSWORD = os.getenv("PASSWORD")

def get_db_connection():
    return mysql.connector.connect(
        user="root",
        password=PASSWORD,
        host="localhost",
        database="taipei_attractions"
    )

# built db structure
# with get_db_connection() as db:
#         with db.cursor(dictionary=True) as cursor:
#             cursor.execute("""CREATE TABLE attractions(
#                 id INT PRIMARY KEY AUTO_INCREMENT,
#                 name VARCHAR(255) NOT NULL,
#                 rate INT NOT NULL DEFAULT 0 ,
#                 mrt VARCHAR(255) NOT NULL,
#                 serial_no BIGINT NOT NULL
#                 image_url TEXT NOT NULL,
#                 description TEXT NOT NULL)
#             """)
#             cursor.execute("INSERT INTO attractions(name, mrt, serial_no, image_url, description) VALUES ('test','test2',123,'test4','test5'); ")
#             db.commit()


# import json into db
# with open("data/taipei-attractions.json", mode="r") as file:
#     data =json.load(file)
#     attractions = data['result']['results']

#     with get_db_connection() as db:
#         with db.cursor(dictionary=True) as cursor:
              
#             for attraction in attractions:
#                 rate = attraction.get("rate", 0)
#                 SpotTitle = attraction["name"]
#                 Mrt = attraction.get("MRT", None)
#                 if Mrt is None:
#                     Mrt = "Unknown" 
#                 Serial_NO = attraction["SERIAL_NO"]
#                 Description = attraction["description"]
#                 Image_URLs = attraction["file"].split("http")[1:]
#                 Image_URLs =[ f"http{url}" for url in Image_URLs]
#                 Image_URLs_str = ",".join(Image_URLs)
#                 # print(Image_URLs_str) 
#                 # print(SpotTitle, Mrt, Serial_NO)

#                 cursor.execute("""
#                     INSERT INTO attractions (rate, name, mrt, serial_no, image_url, description)
#                     VALUES (%s, %s, %s, %s, %s, %s);
#                 """,(rate, SpotTitle, Mrt, Serial_NO, Image_URLs_str, Description))
#             db.commit()


        
