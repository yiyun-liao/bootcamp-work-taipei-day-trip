from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
import os

from task_note.week12_mvc.router import member, page

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

app=FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
templates = Jinja2Templates(directory="task_note/week12_mvc/templates")



app.include_router(member.router)
app.include_router(page.router)

app.mount("/static", StaticFiles(directory="task_note/week12_mvc/static"), name="static")

