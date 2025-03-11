from fastapi import *
from fastapi.responses import FileResponse
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
        host="localhost",
        database="taipei_attractions"
    )

@app.get("/api/attractions")
def get_attractions(
	page: Annotated[int,Query(ge=0)] = 0,
	keyword: Optional[str] = None
	):

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