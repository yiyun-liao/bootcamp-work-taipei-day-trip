- week7 作業用 MVC 調整
- 本期後端用 MVC 調整
## BE
- 建立 booking db
    - 需要存入資料：userId, attractionId,  date, time, price
    - 紀錄：調整 userId 為獨一的值
- GET [/api/booking] 取得尚未確認下單的預定行程
    - 紀錄：db 查詢做一次，然後把取出的資料排列成 api 的需求，目前 attraction 是一個 dict, 包在 data 內。但如果是取出的資料會全部平鋪顯示
- POST [/api/booking] 建立尚未確認下單的預定行程
    - 問題紀錄：也要進行 token 驗證，目前用了 `get("/api/user/auth")` 的相同方法驗證，不確定是否有可以直接用的方式，不然就會每個 api 都要驗證嗎？
    - 紀錄：使用 `OAuth2PasswordBearer` 並且 **沒有提供 token 時**，FastAPI 會直接回傳 **401 Unauthorized**，要用 403 就需要手動驗證
    - 紀錄：完成重複 userId 時要進行 db 更新
    - 思考：如果 userId 有資料可以增加新的刪掉舊的，也可以覆蓋原本資料 => db 可以做到！ `ON DUPLICATE KEY UPDATE`  當你嘗試 INSERT 一筆資料，如果違反了主鍵或唯一鍵的限制，就改成執行 UPDATE, 索引 `INDEX`
- DELETE [/api/booking] 刪除目前的預定行程
- api qa
    - with token
    - without token
    - use missing data
    - use duplicate data

## FE
- 紀錄：增加「預約行程」按鈕點擊監聽，並且調整程式讓登入註冊後可以到目標網址，而不是保留在當前頁面
- Booking page ui
- input component 是否可以共用登入登出的設定
- POST [/api/booking] 建立新的預定行程
    - 紀錄：未登入狀態點擊「開始預約行程」開啟登入 popup
    - 紀錄：create 資料應該要有檢查，但目前 date 使用 datepicker, time 使用 radio button 是 boolean, price 來自 time 的變化，所以前端屬於所有資料都有的狀態，應該不需要另外判斷。真的要檢查的話應該是在後端檢查。
    - 紀錄：加車成功後跳到 /booking 頁面
    - 紀錄：測試修改 token 後送出資料不會顯示 error ，因為在後端設定中 userId 會回傳 none 並沒有正確將錯誤訊息傳遞出來，所以調整邏輯

        ```python
        except HTTPException as http_exc:
        print("get_current_user_id",http_exc)
        return None
        ```
- GET [/api/booking] 取得尚未確認下單的預定行程
	- userName 來自 /api/user/auth
	- 紀錄：設定沒有預定行程的狀態，使用是否有 data 去判斷是否顯示 section ，並且 remove 不用的 section 確保下面的用戶名稱可以正確抓到位置
	- 紀錄：當直接輸入 /booking 時在判斷是否有 token 時 html 會已經都渲染出來，所以加上 display: noe ，確定有 token 再顯示
	- rwd，紀錄預定行程無資料時 footer 為整片灰色，其中一個辦法是計算當前整體高度，如果小於 100vh 動態調整 footer 高度，但覺得太麻煩，所以後來就在 body 加上一樣的灰色，並把 main 底色設定成白色。
- DELETE [/api/booking] 刪除目前的預定行程
- 行為：
	- 點擊購物車按鈕 > 已登入 > 購物車頁面 > 點擊刪除 > 購物車無資料
	- 點擊購物車按鈕 > 未登入 > 登入畫面及流程
	- 點擊預約 > 有資料取代/無資料 > 加車 > 進入購物車頁面
	- 送出資料

## 測試
- 加車(create and update)
    - 點擊預約 > 未登入 > 登入畫面及流程
    - 點擊預約 > 有資料取代 > 加車 > 進入購物車頁面
    - 點擊預約 > 無資料 > 加車 > 進入購物車頁面
- 檢視(read)
    - 點擊購物車按鈕 > 已登入 > 購物車頁面
    - 點擊購物車按鈕 > 未登入 > 登入畫面及流程
    - 購物車頁面 > 顯示資料或是無資料
    - 直接輸入 url > 已登入 > 購物車頁面
    - 直接輸入 url > 未登入 > 跳回首頁
- 刪除(delete)
    - 購物車頁面 > 點擊刪除 > 購物車無資料
- 測試帳號
    - 名稱：0409、帳號：0409@test.com、密碼：04090409
    - 名稱：0409、帳號：040902@test.com、密碼：04090409

## 機會點：
- 信用卡號密碼輸入時限制 16 碼且介面上四碼為一單位
- 「開始預約行程」點擊後紀錄當前 date and time 在 sessionStorage 登入後帶入
- 擴充 fetch 模組，讓這兩週的 fetch 都可以使用
