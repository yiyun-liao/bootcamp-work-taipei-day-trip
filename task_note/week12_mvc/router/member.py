from fastapi import APIRouter, Form, Request, Query, Response
from fastapi.responses import RedirectResponse, JSONResponse
from starlette.status import HTTP_303_SEE_OTHER
from typing import Union

from task_note.week12_mvc.model.member import Member

router = APIRouter()

@router.post("/signup")
async def signup(request:Request, signup_name:str = Form(...), signup_username:str = Form(...), signup_password:str = Form(...)):
    print(f"註冊帳號：姓名： {signup_name}, 帳號：{signup_username}, 密碼：{signup_password}")

    # 檢查帳號是否已經存在 -> 不存在
    member_is_exited = Member.find_member_by_username(signup_username)
    if member_is_exited:
        print(f"註冊失敗 {signup_username} 已經存在")
        return RedirectResponse(url="/error?message=帳號或密碼不正確，請重新登入註冊", status_code=HTTP_303_SEE_OTHER)

    # 檢查帳號是否已經存在 -> 存在
    Member.create_member(signup_name,signup_username,signup_password)
    print(f"註冊成功 {signup_username} 已加入資料庫")
    return RedirectResponse(url="/", status_code=HTTP_303_SEE_OTHER)

@router.post("/signin")
async def login(request: Request, signin_username: str = Form(...), signin_password: str = Form(...)):
    print(signin_username, signin_password) 
    allow_member = Member.verify_member(signin_username, signin_password)
    if allow_member is None:
        print("登入失敗")
        return RedirectResponse(url="/error?message=帳號或密碼不正確，請重新登入",status_code=HTTP_303_SEE_OTHER)
    else:
        print("登入成功", allow_member)
        request.session["SIGNIN"] = True
        request.session["member_id"] = allow_member['id']
        request.session['username'] = allow_member['username']
        request.session['name'] = allow_member['name']
        return RedirectResponse("/member", status_code=HTTP_303_SEE_OTHER)

@router.get("/api/member")
async def search_member_username(request:Request, username: Union[int, str] = Query(...)):    
    if not request.session.get('SIGNIN'):
        return JSONResponse(content={"data": None}, status_code=HTTP_303_SEE_OTHER)
    user = Member.find_member_by_username(username)
    if not user:
        print(f"查無使用者: {username}")
        return JSONResponse(content={"data": None}, status_code=200)
    else:
        result = {
            "data":{
                "id": user["id"],
                "name":user["name"],
                "username":user["username"]
            }
        }
        print (result)
        return JSONResponse(content=result, status_code=200)

            
@router.patch("/api/member")
async def update_member_username(request:Request,response:Response):
    if not request.session.get('SIGNIN'):
        return JSONResponse(content={"error": True}, status_code=HTTP_303_SEE_OTHER)

    new_name_data= await request.json()
    print(new_name_data)
    new_name = new_name_data.get("name","")
    member_id = request.session.get("member_id")
    update_success = Member.update_member_name(member_id, new_name)
    # 檢查更新是否成功
    if update_success:
            name = request.session.get("name")
            print(f"{member_id} 更新成功: {name} to {new_name}" )
            request.session['name'] = new_name
            print("當前 session 資料:", request.session)
            return JSONResponse(content={"ok": True}, status_code=200)
    else:
        print(f"更新失敗")
        return JSONResponse(content={"error": True}, status_code=200)