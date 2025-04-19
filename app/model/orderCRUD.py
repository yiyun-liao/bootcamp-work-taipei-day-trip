from fastapi import *
import uuid
from datetime import datetime

import requests

from app.database import get_db_connection

import os
from dotenv import load_dotenv

load_dotenv()

TAPPAY_PARTNER_KEY = os.getenv("TAPPAY_PARTNER_KEY")
TAPPAY_MERCHANT_ID = os.getenv("TAPPAY_MERCHANT_ID")

class Order:
    def add_unpaid_order_data(order, userId):
            try:
                order_number = f"{datetime.now().strftime('%Y%m%d')}-{userId}-{str(uuid.uuid4()).replace('-', '')[:20]}"
                query = """
                    INSERT INTO order_table (
                        order_number, userId, status, 
                        a_Id, a_name, a_address, a_image,
                        order_date, order_time, order_price, 
                        contact_name, contact_email, contact_phone
                    ) 
                    VALUES (%s, %s, 'UNPAID', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
                """
                params = (
                    order_number, userId,
                    order['trip']['attraction']['id'], order['trip']['attraction']['name'], 
                    order['trip']['attraction']['address'], order['trip']['attraction']['image'],
                    order['trip']['date'], order['trip']['time'], order['price'],
                    order['contact']['name'], order['contact']['email'], order['contact']['phone']
                )

                with get_db_connection() as db:
                    with db.cursor(dictionary=True) as cursor:
                        cursor.execute(query, params)
                        db.commit()
                        # print("新增訂單成功，訂單號：", order_number)

                        cursor.execute("SELECT * FROM order_table WHERE order_number=%s", (order_number,))
                        result = cursor.fetchall()
                        return result
            except Exception as e:
                print(f"新增未付款訂單失敗：{e}")
                return None
    
    def tappay_payment(prime, order):
        tappay_url = "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime"
        tappay_payload = {
            "prime": prime,
            "partner_key": TAPPAY_PARTNER_KEY,
            "merchant_id": TAPPAY_MERCHANT_ID,
            "details": "TapPay booking payment",
            "amount": order["price"],
            "cardholder": {
                "phone_number": order["contact"]["phone"],
                "name": order["contact"]["name"],
                "email": order["contact"]["email"]
            },
            "remember": False
        }
        headers = {
            "Content-Type": "application/json",
            "x-api-key": TAPPAY_PARTNER_KEY
        }

        try:
            res = requests.post(tappay_url, json=tappay_payload, headers=headers)
            result = res.json()
            # print("TapPay 回傳：", result)
            return result
        except Exception as e:
            print("呼叫 TapPay 失敗：", e)
            return {"status": -1, "msg": str(e)}
    
    def renew_paid_order_data(order_id):
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute("UPDATE order_table SET status='PAID' WHERE id=%s", (order_id,))
                db.commit()
                print("order status='PAID'")
    
    def check_paid_order_data(order_id):
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT order_number, status FROM order_table WHERE id=%s", (order_id,))
                return cursor.fetchone() 
    
    def get_order_data(order_number):
        with get_db_connection() as db:
            with db.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM order_table WHERE order_number=%s", (order_number,))
                data_detail = cursor.fetchone() 
                if data_detail:
                    return data_detail
                else: 
                    return None