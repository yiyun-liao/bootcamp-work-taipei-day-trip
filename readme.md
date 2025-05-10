# 專案網站
## 主題： 台北旅遊搜尋
### http://35.75.244.94:8000/

### 技術主題
1. 前後端分離設計、MVC
2. 後端 FastAPI
3. DB 設計
4. AWS EC2 部署
5. 註冊/登入功能
6. TapPay 金流
7. Third-Party API 串接：台北景點、台北捷運


## 網站 DEMO
### 首頁功能概述
- 惰性載入 (lazy loading)
- skelton loading animation、網頁互動及回饋

![首頁概述](/readme/首頁概述.gif)

- 關鍵字搜尋
- 元件、介面設計規範及應用、RWD 設計

![搜尋功能](/readme/搜尋功能.gif)

### 登入註冊功能
- header and footer 模組化
- 完成註冊後自動登入
- 登入註冊後導向目標頁面 `function loginAndSignupPop(targetURL= false)`

![登入註冊](/readme/登入註冊.gif)

### 預約操作流程
- TapPay 串接

![booking頁面操作](/readme/booking頁面操作.gif)

#### 技術
- 前後端分離
- MVC 架構

![FE_MVC](/readme/FE_MVC.png)
![BE_MVC](/readme/BE_MVC.png)

## 參考資料
1. [台北捷運 API](https://www.metro.taipei/cp.aspx?n=BDEB860F2BE3E249)
2. 台北景點資料由 WeHelp 提供
