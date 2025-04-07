from fastapi import *

from app.model.attractions import Attractions

router = APIRouter()

@router.get("/api/mrts")
def get_attractions():
	try:
		render_metros_chip = Attractions.filter_by_metros()
		return{
			"data": render_metros_chip}
	except Exception as e:
		print(f"Error: {e}")
		raise HTTPException(
            status_code=500,
            detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
            }
        )	
