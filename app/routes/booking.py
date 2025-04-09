from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.security.utils import get_authorization_scheme_param

from app.model.bookingCRUD import Booking
from app.model.auth_token import AuthToken

router = APIRouter()

@router.get("/api/booking")
def get_booking_state(request:Request):
    userId = AuthToken.get_current_user_id(request)
    if userId is None:
        print("get_booking_state 403")
        raise HTTPException(
            status_code = 403,
            detail={"error": True, "message": "未登入系統"}
        )

    try:
        current_booking_data = Booking.show_current_booking_data(userId)
        return{
            "data":current_booking_data
        }
    except Exception as e:
        print(f"Error:{e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "讀取資料錯誤"                
            }
        )

@router.post("/api/booking")
async def create_booking_state(request:Request):
    userId = AuthToken.get_current_user_id(request)
    print(userId)
    if userId is None:
        print("create_booking_state 403")
        raise HTTPException(
            status_code = 403,
            detail={"error": True, "message": "未登入系統"}
        )
    body = await request.json()
    attractionId, date, time, price = (body.get(item) for item in ("attractionId", "date", "time", "price"))
    if not all([attractionId, date, time, price]):
        return JSONResponse(
            status_code = 400,
            content={"error":True, "message":"提供資料有少"}
        )
    
    try:
        add_is_success = Booking.add_new_booking_data(userId, attractionId, date, time, price)
        
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

@router.delete("/api/booking")
def delete_booking_state(request:Request):
    userId = AuthToken.get_current_user_id(request)
  
    try:
        delete_is_success = Booking.delete_current_booking_data(userId)
        
        if delete_is_success:
            return{
                "ok":True
            }
    except Exception as e:
        print(f"Error:{e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "刪除失敗"                
            }
        )