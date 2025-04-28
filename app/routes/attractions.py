from fastapi import *
from typing import Annotated, Optional
from app.routes.util.cache import cache
import json



from app.model.attractionsCRUD import Attractions
router = APIRouter()

@router.get("/api/attractions")
def get_attractions(
	page: Annotated[int,Query(ge=0)],
	keyword: Optional[str] = None
	):
	try:
		attractions_gallery = Attractions.render_attractions_page(page, keyword)
		return attractions_gallery
	except Exception as e:
		print(f"Error: {e}")
		raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
            }
        )

@router.get("/api/attraction/{attractionId}")
def get_attraction_page(attractionId=int):
	try:		
		print(attractionId)
		attraction_detail = cache.get("attraction-"+str(id)) #先從快取中抓資料
		if attraction_detail != None: #如果快取中已經有資料，直接回傳資料，避開從資料庫中抓資料
			return {
				"data":attraction_detail}
		# 快取中沒有才去資料去中找資料
		attraction_detail = Attractions.render_separate_attraction_page(attractionId)
		# print(attraction_detail)

		if attraction_detail is None:
			responses.status.code = 400
			return {"error": True}

		else:
			attraction_detail["images"] = json.loads(attraction_detail["images"])
			cache.put("attraction-"+str(id), attraction_detail) 
			return{
				"data":attraction_detail}
	
	except Exception as e:
		print(f"Error: {e}")
		raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
            }
        )