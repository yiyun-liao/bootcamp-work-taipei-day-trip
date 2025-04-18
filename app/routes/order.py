# import requests

from fastapi import APIRouter, Request, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security.utils import get_authorization_scheme_param
from pydantic import BaseModel, EmailStr
from typing import Dict


from app.model.bookingCRUD import Booking
from app.model.auth_token import AuthToken
from app.model.orderCRUD import Order

router = APIRouter()

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
        add_is_success = Order.add_unpaid_order_data(order, userId)
        
        if add_is_success:
            return{
                "ok":True
            }
    except Exception as e:
        print(f"Error:{e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "系統存取失敗"                
            }
        )


