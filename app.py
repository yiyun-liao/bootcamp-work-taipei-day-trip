from fastapi import *
from fastapi.responses import FileResponse, JSONResponse
import mysql.connector
from dotenv import load_dotenv
import os
import json
from typing import Annotated, Optional

app=FastAPI()
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
PASSWORD = os.getenv("PASSWORD")

def get_db_connection():
    return mysql.connector.connect(
        user="root",
        password=PASSWORD,
        host="35.75.244.94",
        database="taipei_attractions"
    )


@app.get("/api/attractions")
def get_attractions(
	page: Annotated[int,Query(ge=0)],
	keyword: Optional[str] = None
	):
	try:
		search = "SELECT * FROM attractions"

		# 分頁回傳
		limit = 12
		offset = limit * page

		# 檢查是否有下頁資料
		next_page = None
		next_page_offset = limit * (page + 1)

		# 模糊查詢
		if keyword:
			search += " WHERE mrt = %s OR name LIKE %s"
			search += " LIMIT %s OFFSET %s;"
			params = (keyword, f"%{keyword}%", limit, offset)
			next_page_params = (keyword, f"%{keyword}%", limit, next_page_offset)
		else:
			search += " LIMIT %s OFFSET %s;"
			params = (limit, offset)	
			next_page_params = (limit, next_page_offset)
		
		print(f"cursor.execute({search},{params})" )
		print(f"cursor.execute({search},{next_page_params})" )

		db = get_db_connection()
		cursor = db.cursor(dictionary=True)
		cursor.execute(search,params)
		data = cursor.fetchall()
		cursor.execute(search,next_page_params)
		next_page_data = cursor.fetchall()
		cursor.close()
		db.close()

		for img in data:
			img["images"] = json.loads(img["images"])

		if next_page_data:
			next_page = page + 1
		else:
			next_page = None

		return{
			"nextPage":next_page,
			"data": data}
	except Exception as e:
		print(f"Error: {e}")
		raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
            }
        )


@app.get("/api/attraction/{attractionId}")
def get_attractions(attractionId=int):
	try:		
		print(attractionId )

		db = get_db_connection()
		cursor = db.cursor(dictionary=True)
		cursor.execute("SELECT * FROM attractions WHERE id = %s",(attractionId,))
		data = cursor.fetchone()
		cursor.close()
		db.close()

		if not data:
			return JSONResponse(content={
				"error": True,
				"message": "請按照情境提供對應的錯誤訊息"
			}, status_code=400)

		data["images"] = json.loads(data["images"])

		return{
			"data":data}
	
	except Exception as e:
		print(f"Error: {e}")
		raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
            }
        )

@app.get("/api/mrts")
def get_attractions():
	try:		
		db = get_db_connection()
		cursor = db.cursor(dictionary=True)
		cursor.execute("SELECT mrt FROM attractions")
		data = cursor.fetchall()
		cursor.close()
		db.close()
		mrt = set(item['mrt'] for item in data)
		mrt.remove('Unknown')
		mrt_list = list(mrt)
		print(mrt_list)
		return{
			"data": mrt_list}
	except Exception as e:
		print(f"Error: {e}")
		raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
            }
        )	

# Static Pages (Never Modify Code in this Block)
@app.get("/", include_in_schema=False)
async def index(request: Request):
	return FileResponse("./static/index.html", media_type="text/html")
@app.get("/attraction/{id}", include_in_schema=False)
async def attraction(request: Request, id: int):
	return FileResponse("./static/attraction.html", media_type="text/html")
@app.get("/booking", include_in_schema=False)
async def booking(request: Request):
	return FileResponse("./static/booking.html", media_type="text/html")
@app.get("/thankyou", include_in_schema=False)
async def thankyou(request: Request):
	return FileResponse("./static/thankyou.html", media_type="text/html")