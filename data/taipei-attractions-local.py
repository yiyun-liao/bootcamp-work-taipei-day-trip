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


# build NEW metros structure/table ===========================================================================
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("CREATE TABLE metrosNEW (id INT PRIMARY KEY AUTO_INCREMENT, mrt VARCHAR(255) NOT NULL, mrtID VARCHAR(255) NOT NULL)")
#         db.commit()



# import new data into metros
# import urllib.request as request
# import ssl

# # ssl problem
# ssl._create_default_https_context = ssl._create_unverified_context

# url="https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/Station/TRTC?%24format=JSON"
# header={
#     "content-type":"application/json; charset=utf-8",
#     "User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36"
# }
# metro = request.Request(url, headers=header)
# with request.urlopen(metro) as response:
#     data= json.loads(response.read().decode("utf-8")) 
#     # print(data)
#     with get_db_connection() as db:
#         with db.cursor(dictionary=True) as cursor:
#             for a in data:
#                 StationId = a["StationID"]
#                 StationName = a["StationName"]["Zh_tw"]
#                 print(StationId, StationName)

#                 cursor.execute("INSERT INTO metrosNEW (mrt, mrtID) VALUES (%s, %s);",(StationName, StationId))
#                 db.commit()        

# update metro_id in attractions ===========================================================================
# step01 刪除外鍵

# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:

        # cursor.execute("""ALTER TABLE attractions 
        #     ADD COLUMN mrt_id_new VARCHAR(255) NULL AFTER mrt_id;""")
        # cursor.execute("""UPDATE attractions
        #     JOIN metros ON attractions.mrt_id = metros.id
        #     JOIN metrosNEW ON metros.mrt = metrosNEW.mrt 
        #     SET attractions.mrt_id_new = metrosNEW.mrtID;""")

        # after check the mrt_id is right, drop the mrt_id column and rename mrt_id_new to mrt_id
        # cursor.execute("""SELECT 
        #     attractions.name, attractions.mrt_id, metros.mrt AS old_metro, attractions.mrt_id_new  AS new_metro, metrosNEW.mrt 
        #     FROM attractions
        #     LEFT JOIN metros ON attractions.mrt_id = metros.id
        #     LEFT JOIN metrosNEW ON attractions.mrt_id_new = metrosNEW.mrtID;""")
        # data = cursor.fetchall()
        # print(data)
        # cursor.execute("ALTER TABLE attractions DROP COLUMN mrt_id;")
        # cursor.execute("ALTER TABLE attractions CHANGE mrt_id_new mrt_id VARCHAR(255);")
        # cursor.execute("ALTER TABLE attractions ADD CONSTRAINT fk_metro_new_id FOREIGN KEY (mrt_id_new) REFERENCES metrosNEW(mrtID) ON DELETE SET NULL;")
        # db.commit()




# build metros structure/table ===========================================================================
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

# adjust mrt column into attractions table
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("""ALTER TABLE attractions 
#             ADD COLUMN mrt_id INT NULL AFTER mrt, 
#             ADD FOREIGN KEY (mrt_id) REFERENCES metros(id) ON DELETE SET NULL;""")
#         cursor.execute("""UPDATE attractions JOIN metros 
#             ON attractions.mrt = metros.mrt
#             SET attractions.mrt_id = metros.id;""")
#         cursor.execute("ALTER TABLE attractions ADD CONSTRAINT fk_metro_id FOREIGN KEY (mrt_id) REFERENCES metros(id) ON DELETE SET NULL;")        
#         db.commit()

# after check the mrt_id is right, drop the mrt column and rename mrt_id to mrt
# SELECT attractions.id, attractions.name, attractions.mrt, metros.mrt FROM attractions LEFT JOIN metros ON attractions.mrt_id = metros.id;
# with get_db_connection() as db:
#     with db.cursor(dictionary=True) as cursor:
#         cursor.execute("ALTER TABLE attractions DROP COLUMN mrt;")
#         db.commit()



# build attractions structure/table ===========================================================================
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


        
