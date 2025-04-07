## BE
- 會員 db
	- 會員密碼：記得之前在討論 sessionMiddleware 時有說到密碼會用雜湊方式儲存，為不可逆性，所以用戶登入時是再次進行雜湊後去配對是否一致，並不會直接儲存該密碼（所以忘記密碼時會要求用戶直接更新密碼，因為我們也無法取得原本的真實密碼，作業做完有機會設計看看）
- 紀錄：使用 modules 重新架構後端
	- 問題：循環導入 (Circular Import)
		- 原本沒有想要拆太細，所以 main.py 包含 db 連線和靜態網頁渲染，但是遇到循環導入問題，就是app/main.py 嘗試從 app/routes/attractionID.py 導入 attractionID，而 attractionID.py 又回頭導入 app.main.get_db_connection，導致 循環導入 問題。
		- 所以還是將 db 連線另外拉出一個 file 存放。
	- `app.include_router(attractions.router)`, `router = APIRouter()`
- POST [/api/user] 註冊一個新的會員
	- `def create_message(body: dict = Body(...)):`  
	- `response:response`
	- `request: Request` 也可以使用 `data: LoginRequest`
	- 複習一下 body 的做法，原本是用 `body:dict = Body(...)` ，但這個需求屬於處理資料庫/API 請求，所以改成手動 async await 處理
	```python
	@router.post("/api/user")
	def create_new_user(body:dict = Body(...)):
        print(body)
        name = body.get('name')
        mail = body.get('mail')
        password = body.get('password')

        if not name or not mail or not password:
            return JSONResponse(
                content={ "error": True, "message": "請按照情境提供對應的錯誤訊息"},
                status_code=400
            )
        try:
            with get_db_connection() as db:
                with db.cursor(dictionary=True) as cursor:
                    cursor.execute("SELECT userMail FROM userData WHERE userMail= %s", (mail,))
                    user_is_exited = cursor.fetchone()
                    if user_is_exited:
                        print(f"註冊失敗 {user_is_exited} 已經存在")
                        return JSONResponse(
                            content={ "error": True, "message": "請按照情境提供對應的錯誤訊息"},
                            status_code=400
                        )
                    cursor.execute("INSERT INTO member (userName, userMail, userPassword) VALUES (%s, %s, %s);",(name, mail, password))
                    db.commit()       
                    print(f"註冊成功 {mail} 已加入資料庫")
                    return{ "ok": True }
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(
                status_code=500,
                detail={
                "error": True,
                "message": "請按照情境提供對應的錯誤訊息"
                }
            )
	```
	- 紀錄：原本是先拿 mail 去找 db 中是否有一樣的，但想到可以在欄位設定 unique 去做判斷，在匯入資料時就可以由 bd 是否成功去判斷，就不用抓取兩次資料
	- 紀錄：嘗試直接編輯 ec2 上的 db
- PUT [/api/user/auth] 登入會員帳戶
	- PyJWT
	- `cookie`, `JWT`, `OAuth` 存儲在使用者瀏覽器中的小型數據。
	- datetime
	- 紀錄：先完成用戶登入資訊確認並取得對應 username, mail, id 才去生成 token
- GET [/api/user/auth] 取得當前登入的會員資訊
	- 紀錄：確認 token 後從 token 中取得所需資料

## FE
- Pop-Up Dialog for User Sign Up/In
	- 思考：跳出視窗要怎麼做到共用，而不是每個頁面都加
	- 紀錄：原本的 header and footer 就是用 js 動態加入，但是目前 header 要加的泡泡用 js innerHTML 寫感覺有點奇怪，後來找到方法是設定 header.html 然後把整個 html 加到每個畫面中，這樣就可以在 html 中設計 popup 了
	- 紀錄：漸層色不能用 `background-color` 要用 `background`, gradient
	- name, email, and password
	- input component
- 行為：
	- 點擊按鈕 > 開啟 > 點擊 x > 關閉
	- 點擊按鈕 > 開啟 > 點擊切換 > 切換
	- 送出資料
	- log in 判斷錯誤
		- 以不改畫面為前提，用 alert 顯示 error message
- PUT [/api/user/auth] 登入會員帳戶
	- Sign In Procedure
	- 存在 application > local storage > url
	- Sign Out Procedure - 登出，清空 token
- GET [/api/user/auth] 取得當前登入的會員資訊
	- 紀錄：這個確認應該會被廣泛應用，包含整個畫面的 render 但目前沒有這個需求，但把這個確認放在 `main.js` 的最上面，在所有頁面渲染前就先確認。
	- 紀錄：登入登出按鈕的變化原本是寫在 `checkTokenValid()` 這裡面，但是這個確認會在 `checkTokenValid()` 前就完成，會有 error ，所以使用 return 的方式，如果有帶用戶資料，就會在 `checkTokenValid()` 進行判斷。補充紀錄，會有渲染問題，再將狀態往下帶一層
	- 紀錄：在判斷為未登入狀態後，console 會一直跳 401 error ，前端調整後還是有跳，才發現是後端明確將 401 資料回傳，所以改成 print 出來但是回傳 null。（現在才理解為什麼那隻 api 寫說未登入要回傳 null）
	- 紀錄：測試時，有時候 login 按鈕會怪怪的，調整了一下，應該是因為
- POST [/api/user] 註冊一個新的會員
	- 紀錄：註冊邏輯與登入的錯誤判斷偏相似，拿登入邏輯過來改
	- 紀錄：增加註冊完後自動登入
	- 紀錄：error hint 原本是用 class 做，但是只有 queryselector 選擇第一個，所以畫面渲染玩只會抓到 login 的 error hint 欄位，導致註冊的不會被應用到，改成用 id 避免這個問題

## ec2
- 更新 .env

## 機會點：
- 密碼使用雜湊方式儲存
- 密碼的預覽
- popup 點擊外部時可以提醒要編輯 popup

## 測試
- 註冊
	- 前端限制測試（使用者有值、帳號有 @ 、密碼數量）
	- 特殊字符 > 註冊成功 > 自動登入 > 頁面切換 > 登出
	- 一般帳號 > 註冊成功 > 自動登入 > 頁面切換 > 登出
	- 重複帳號 > 註冊失敗 > error hint
- 登入
	- 前端限制測試（帳號有 @ 、密碼數量）
	- 特殊字符 > 登入成功 > 自動登入 > 頁面切換 > 登出
	- 一般帳號 > 登入成功 > 自動登入 > 頁面切換 > 登出
	- 登入失敗 > error hint
- 測試帳號
	- 名稱：/040105、帳號：'040105@test.com、密碼：'04010401
	- 名稱：040106、帳號：040106@test.com、密碼：04010401

## PR
- 紀錄：原本是只要顯示畫面就呼叫指令，指令執行就會執行一次監聽，所以多次頁面切換下來累積多次監聽（我的理解是這樣）。調整成在切歡畫面的 function 上綁定一次監聽，如果真的執行後才會去進行內容的確認及後續。