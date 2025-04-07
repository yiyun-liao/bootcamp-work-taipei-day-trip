from fastapi import *
import json
from fastapi.responses import JSONResponse


from app.database import get_db_connection

class Booking:
    def add_new_booking_data(userId, attractionId, date, time, price):
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute(
                    "INSERT INTO booking_state (userId, attractionId, date, time, price) "
                    "VALUES (%s, %s, %s, %s, %s);",
                    (userId, attractionId, date, time, price))
                db.commit()
                if cursor.rowcount > 0:
                    return True

    def show_current_booking_data(userId):
        search = """
            SELECT 
            booking_state.attractionId as id,
            attractions.name, 
            attractions.address, 
            attractions.images as image,
            booking_state.date,
            booking_state.time,
            booking_state.price
            FROM booking_state 
            LEFT JOIN attractions ON booking_state.attractionId = attractions.id
            LEFT JOIN userData ON booking_state.userId = userData.id
            WHERE booking_state.userId = %s
            """
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute(search, (userId,))
                data = cursor.fetchone()
                if data:
                    image = json.loads(data["image"])
                    data["image"] = image[0] if image else None
                    print(data)
                    return {"attraction": data}

