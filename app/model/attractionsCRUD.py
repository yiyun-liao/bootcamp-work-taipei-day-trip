from fastapi import *
import json
from fastapi.responses import JSONResponse


from app.database import get_db_connection

class Attractions:
    def render_attractions_page(page, keyword):
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
    
    def render_separate_attraction_page(attractionId):
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

        return data

    def filter_by_metros():
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
        return mrt_list