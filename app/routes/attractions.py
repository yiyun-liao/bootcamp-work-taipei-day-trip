from fastapi import *
from typing import Annotated, Optional

from app.model.attractions import Attractions
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
		attraction_detail = Attractions.render_separate_attraction_page(attractionId)
		print(attraction_detail)
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