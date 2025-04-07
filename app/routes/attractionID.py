from fastapi import *
from fastapi.responses import JSONResponse
import json
from app.database import get_db_connection

router = APIRouter()

@router.get("/api/attraction/{attractionId}")
def get_attractions(attractionId=int):
	try:		
		print(attractionId )

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
			WHERE attractions.id = %s
			"""
		
		db = get_db_connection()
		cursor = db.cursor(dictionary=True)
		cursor.execute(search,(attractionId,))
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