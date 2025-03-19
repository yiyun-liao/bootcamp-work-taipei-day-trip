import mysql.connector
from dotenv import load_dotenv
import os
import json

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
PASSWORD = os.getenv("MYSQL_LOCAL_PASSWORD")

def get_db_connection():
    return mysql.connector.connect(
        user="root",
        password=PASSWORD,
        host="localhost",
        database="taipei_attractions"
    )


# build metros structure/table
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("CREATE TABLE metros (id INT PRIMARY KEY AUTO_INCREMENT, mrt VARCHAR(255) NOT NULL)")
#         db.commit()


# import json into metros
# with open("data/taipei-attractions.json", mode="r") as file:
#     data = json.load(file)
#     attractions = data['result']['results']

#     with get_db_connection() as db:
#         with db.cursor(dictionary=True) as cursor:
#             mrt = set(attraction['MRT'] for attraction in attractions)
#             mrt_list = [m for m in mrt if m is not None]
#             print(mrt_list, len(mrt_list))

#             for m in mrt_list:
#                 cursor.execute("INSERT INTO metros (mrt) VALUES (%s)", (m,))
#                 db.commit()


# build attractions structure/table
# with get_db_connection() as db:
#         with db.cursor(dictionary=True) as cursor:
#             cursor.execute("""CREATE TABLE attractions(
#                 id INT PRIMARY KEY AUTO_INCREMENT,
#                 name VARCHAR(255) NOT NULL,
#                 category VARCHAR(255) NOT NULL,
#                 description TEXT NOT NULL,
#                 address VARCHAR(255) NOT NULL,
#                 transport TEXT NOT NULL,
#                 mrt VARCHAR(255) NOT NULL,
#                 latitude FLOAT NOT NULL DEFAULT 0,
#                 longitude FLOAT NOT NULL DEFAULT 0,                                  
#                 image TEXT)
#             """)
#             db.commit()



# import data into attractions
# with open("data/taipei-attractions.json", mode="r") as file:
#     data =json.load(file)
#     attractions = data['result']['results']

#     with get_db_connection() as db:
#         with db.cursor(dictionary=True) as cursor:
              
#             for attraction in attractions:
#                 Name = attraction["name"]
#                 # Rate = attraction.get("rate", 0)
#                 # Serial_NO = attraction["SERIAL_NO"]
#                 Category = attraction["CAT"]
#                 Description = attraction["description"]
#                 Address = attraction["address"]
#                 Transport = attraction["direction"]
#                 Mrt = attraction.get("MRT", None)
#                 if Mrt is None:
#                     Mrt = "Unknown" 
#                 Latitude = attraction["latitude"]
#                 Longitude = attraction["longitude"]


#                 Image_URLs = attraction["file"].split("http")[1:]
#                 Image_URLs =[ f"http{url}" for url in Image_URLs]
#                 correct_URLS = (".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG")
#                 Image_URLs = [url for url in Image_URLs if url.lower().endswith(correct_URLS)]
#                 Image_URLs_str = json.dumps(Image_URLs)
#                 # print(Name, Mrt, Serial_NO, Category, Longitude, Latitude)

#                 cursor.execute("""
#                     INSERT INTO attractions (name, category, description, address, transport, mrt, latitude, longitude, image)
#                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
#                 """,(Name, Category, Description, Address, Transport, Mrt, Latitude, Longitude, Image_URLs_str))
#             db.commit()


        
