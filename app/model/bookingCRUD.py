from fastapi import *
import json
from fastapi.responses import JSONResponse


from app.database import get_db_connection

class Booking:
    def add_new_booking_data(userId, attractionId, date, time, price):
        add_or_update= """
            INSERT INTO booking_state (userId, attractionId, date, time, price) 
            VALUES (%s, %s, %s, %s, %s) 
            ON DUPLICATE KEY UPDATE 
                attractionId = VALUES(attractionId), 
                date = VALUES(date), 
                time = VALUES(time), 
                price = VALUES(price);
            """
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute(add_or_update,(userId, attractionId, date, time, price))
                db.commit()
                if cursor.rowcount > 0:
                    return True

    def show_current_booking_data(userId):
        search = """
            SELECT 
            booking_state.*,
            attractions.name, 
            attractions.address, 
            attractions.images
            FROM booking_state 
            LEFT JOIN attractions ON booking_state.attractionId = attractions.id
            WHERE booking_state.userId = %s
            """
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute(search, (userId,))
                data = cursor.fetchone()
                if data:
                    data["images"] = json.loads(data["images"])[0] if data["images"][0] else None
                    # print(data)
                    newData = {
                        "attraction":{
                            "id":data["attractionId"],
                            "name":data["name"],
                            "address":data["address"],
                            "image":data["images"]
                        },
                        "date":data["date"],
                        "time":data["time"],
                        "price":data["price"]
                    }
                    return newData

