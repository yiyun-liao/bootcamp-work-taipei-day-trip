from fastapi import *
import json
from typing import Annotated, Optional
from app.database import get_db_connection

router = APIRouter()

@router.get("/api/attractions")
def get_attractions(
	page: Annotated[int,Query(ge=0)],
	keyword: Optional[str] = None
	):
	try:
		search = """
			SELECT 
			attractions.id, 
			attractions.name, 
			attractions.category, 
			attractions.description, 
			attractions.address, 
			attractions.transport, 
			metrosNEW.mrt,
			attractions.lat, 
			attractions.lng, 
			attractions.images
			FROM attractions 
			LEFT JOIN metrosNEW ON attractions.mrt_id_new = metrosNEW.mrtID
			"""

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
		
		print(f"cursor.execute({params})" )
		print(f"cursor.execute({next_page_params})" )

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