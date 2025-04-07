from fastapi import APIRouter, Form, Request
from fastapi.responses import RedirectResponse
from starlette.status import HTTP_303_SEE_OTHER
from fastapi.templating import Jinja2Templates

from task_note.week12_mvc.model.message import Message

router = APIRouter()
templates = Jinja2Templates(directory="task_note/week12_mvc/templates")


@router.get("/")
def index(request: Request):
    if request.session.get("SIGNIN") is True:
        return RedirectResponse(url="/member", status_code=HTTP_303_SEE_OTHER)
    return templates.TemplateResponse("index.html",{
        "request": request,
        "pageTitle": "week7 前後端分離",
        "title": "歡迎光臨，請註冊登入系統",
    })

@router.get("/member")
def member(request: Request):
    if not request.session.get("SIGNIN"):
        return RedirectResponse(url="/", status_code=HTTP_303_SEE_OTHER)    
    print("當前 session 資料:", request.session)

    messages = Message.get_all_message()

    name=request.session.get("name")
    return templates.TemplateResponse("member.html", {
        "request": request,
        "pageTitle": "week7 前後端分離",
        "title": "歡迎光臨，這是會員頁",
        "username": name,
        "messages": messages
        })

@router.get("/error")
def error(request: Request, message: str = "Login failed"):
    return templates.TemplateResponse("error.html", {
        "request": request,
        "pageTitle": "week7 前後端分離",
        "title": "失敗頁面",
        "subtitle": message
    })

@router.post("/createMessage")
def create_message(request:Request, create_message_content: str = Form(...)):
    if not request.session.get('SIGNIN'):
        return RedirectResponse(url="/", status_code=HTTP_303_SEE_OTHER)    
    member_id = request.session.get("member_id")
    print(f"{member_id} 傳送了 {create_message_content}")

    Message.create_message(member_id, create_message_content)
    return RedirectResponse(url="/member", status_code=HTTP_303_SEE_OTHER)


        
@router.delete("/deleteMessage/{message_id}")
async def delete_message(request:Request, message_id: int):
    if not request.session.get('SIGNIN'):
        return RedirectResponse(url="/", status_code=HTTP_303_SEE_OTHER)
    print(message_id)
    
    Message.delete_message(message_id)
    print("成功刪除")
    return RedirectResponse(url="/member", status_code=HTTP_303_SEE_OTHER)



@router.get("/signout")
def signout(request:Request):
    request.session.clear() 
    # print("當前 session 資料:", request.session)
    return RedirectResponse(url="/", status_code=HTTP_303_SEE_OTHER)