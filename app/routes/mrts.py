from fastapi import *
from app.database import get_db_connection

router = APIRouter()

@router.get("/api/mrts")
def get_attractions():
	try:
		search= """
			SELECT metrosNEW.mrt FROM metrosNEW
			LEFT JOIN attractions ON metrosNEW.mrtID = attractions.mrt_id_new
			GROUP BY metrosNEW.mrt
			HAVING COUNT(attractions.id) > 0
			ORDER BY COUNT(attractions.id) DESC;
			"""
		db = get_db_connection()
		cursor = db.cursor(dictionary=True)
		cursor.execute(search)
		data = cursor.fetchall()
		cursor.close()
		db.close()
		# print(data)
		mrt_list = list(item['mrt'] for item in data)
		# print(mrt_list, len(mrt_list))
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
