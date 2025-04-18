from fastapi import *
import json
from fastapi.responses import JSONResponse
import uuid
from datetime import datetime

from app.database import get_db_connection

class Order:
    def add_unpaid_order_data(order, userId):
        order_number = f"{datetime.now().strftime("%Y%m%d")}-{userId}-{str(uuid.uuid4()).replace("-", "")[:20]}"
        add_unpaid_order= """
            INSERT INTO order_table (
                order_number, userId, status, 
                attractionId, attraction_name, attraction_address, attraction_image,
                order_date, order_time, order_price, 
                contact_name, contact_email, contact_phone) 
            VALUES (%s, %s, "UNPAID", %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
            """
        params = (
            order_number, userId,
            order['trip']['attraction']['id'],order['trip']['attraction']['name'],order['trip']['attraction']['address'],order['trip']['attraction']['image'],
            order['trip']['date'],order['trip']['time'],order['price'],
            order['contact']['name'],order['contact']['email'],order['contact']['phone']
            )
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute(add_unpaid_order,params)
                db.commit()
                if cursor.rowcount > 0:
                    print("add order success")
                    return True
