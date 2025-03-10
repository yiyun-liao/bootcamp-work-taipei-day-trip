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
with get_db_connection() as db:
        with db.cursor(dictionary=True) as cursor:
            cursor.execute("""CREATE TABLE attractions(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                mrt VARCHAR(255) NOT NULL,
                serial_no INT NOT NULL,
                image_url VARCHAR(2000) NOT NULL,
                description TEXT NOT NULL)
            """)
            cursor.execute("INSERT INTO attractions(name, mrt, serial_no, image_url, description) VALUES ('test','test2',123,'test4','test5'); ")
            db.commit()


# import json into db
with open("data/taipei-attractions.json", mode="r") as file:
    data =json.load(file)
    attractions = data['result']['results']
    for attraction in attractions:
        rate = attraction["rate"]
        SpotTitle = attraction["name"]
        Mrt = attraction["MRT"]
        Serial_NO = attraction["SERIAL_NO"]
        Description = attraction["description"]
        Image_URLs = attraction["file"].split("http")[1:]
        Image_URLs =[ f"http{url}" for url in Image_URLs]
        # print(Image_URLs) 
    # taipei_attractions = {attraction["name"]:attractions for attraction in attractions}
    # print(taipei_attractions)

        
