from fastapi import *
from fastapi.responses import JSONResponse
from typing import Annotated, Optional


from app.model.auth_token import AuthToken
from app.model.orderCRUD import Order

router = APIRouter()

@router.get("/api/order/{orderNumber}")
def get_attractions(
    request:Request,
	orderNumber:str,
	):
    print(orderNumber)
    userId = AuthToken.get_current_user_id(request)
    print(userId)
    if userId is None:
        print("create_order_state 403")
        raise HTTPException(
            status_code = 403,
            detail={"error": True, "message": "未登入系統"}
        )
    try:
        order_detail = Order.get_order_data(orderNumber)
        return order_detail
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
            }
        )
    


@router.post("/api/orders")
async def create_order_state(request:Request):
    userId = AuthToken.get_current_user_id(request)
    print(userId)
    if userId is None:
        print("create_order_state 403")
        raise HTTPException(
            status_code = 403,
            detail={"error": True, "message": "未登入系統"}
        )
    body = await request.json()
    prime, order= (body.get(item) for item in ("prime", "order"))
    if not all([prime, order]):
        return JSONResponse(
            status_code = 400,
            content={"error":True, "message":"提供資料有少"}
        )
    
    try:
        #建立未付款訂單
        order_result = Order.add_unpaid_order_data(order, userId)
        order_result_id = order_result[0]['id']
        order_result_number = order_result[0]['order_number']

        if order_result_id is None:
            return JSONResponse(
                status_code = 400,
                content={"error":True, "message":"訂單建立失敗"}
            )
        print(f"建立訂單成功，訂單 ID：{order_result_id}")
        
        #呼叫 TapPay
        taypay_result = Order.tappay_payment(prime, order)
        print("TapPay 回傳：", taypay_result)
        #儲存付款紀錄

        if taypay_result["status"] != 0:
            print(f"訂單號：{order_result_number}，TapPay 回傳狀態：{taypay_result['status']}，訊息：{taypay_result.get('msg')}")
            return JSONResponse(
                status_code=200,
                content={
                    "data": {
                        "number": order_result_number,
                        "payment": {
                            "status": taypay_result["status"],
                            "message": f"付款失敗：{taypay_result.get('msg')}"
                        }
                    }
                }
            )
        Order.renew_paid_order_data(order_result_id)
        
        order_status = Order.check_paid_order_data(order_result_id)
        if order_status['status'] == "PAID":
            return JSONResponse(
                status_code=200, 
                content={
                    "data": {
                        "number": order_status['order_number'],
                        "payment": {
                        "status": taypay_result["status"],
                        "message": "付款成功"
                        }
                    }
                }
            )
    except Exception as e:
        print(f"Error:{e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "系統存取失敗"                
            }
        )


