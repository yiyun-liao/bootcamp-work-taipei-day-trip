from fastapi import *
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.routes import attractions, metros, userAuth, booking, order

app=FastAPI()

app.include_router(attractions.router)
app.include_router(metros.router)
app.include_router(userAuth.router)
app.include_router(booking.router)
app.include_router(order.router)

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

app.mount("/static", StaticFiles(directory="static"), name="static")