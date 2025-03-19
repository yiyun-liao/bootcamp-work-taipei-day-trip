*kick off the new project, build db and design 3 api then deploy on ec2*
--

## 建立 db
- create db - 在終端機先建好 DATABASE
```zshc
CREATE DATABASE taipei_attractions;
USE taipei_attractions;
```
```mysql
# 增加欄位
ALTER TABLE attractions
ADD COLUMN rate INT NOT NULL DEFAULT 0 AFTER name;

# 調整欄位
ALTER TABLE attractions
MODIFY serial_no BIGINT NOT NULL;

ALTER TABLE attractions
MODIFY image_url TEXT NOT NULL;
```

## 整理 json 資料
```python
Image_URLs = attraction["file"].split("http")[1:]
Image_URLs =[ f"http{url}" for url in Image_URLs]
```
- 拆開 jpg`string.split(separator, maxsplit)` Split a string into a list where each word is a list item
- 增加後綴 `string.endswith(value, start, end)` 判斷字尾為何
- 寫入 JSON 格式 `json.dump(要寫入的資料, 檔案物件)`

|函數 | 說明|
|---- | ---- |
|json.dumps | 將Python對象(Object)編碼成JSON格式的字符串|
|json.dump | 將Python字典轉成JSON後，寫入JSON文件|
|json.loads | 將JSON字符串解碼成為Python對象(Object)|
|json.load | 直接讀取JSON文件，並轉成Python字典|
- `set([iterable]) `將字串拆解成集合，不重複，且順序隨機
- list([iterable]) 放入可迭代對象（iterable），並將其轉換為列表（list）

## 匯入資料
- 問題：serial_no 資料太長 => 改成 BIGINT
- 問題：img_url 資料太長 => 改成 TEXT
- 問題：mrt 有值是 null 導致匯入 db 時會是 null, 但結構上已經限制 NOT NULL
	- 因為 get 值為 null 並不是沒有 get 值，所以要另外判斷如果值是 null 要轉換
- 讓 id 從 1 開始
```mysql
ALTER TABLE attractions AUTO_INCREMENT = 1;
TRUNCATE TABLE attractions;
# 重新 import 資料
```

## 打 api 拿到資料
- 問題：看 api 後發現自己資料結構有問題，重做 db
- 分頁功能
	- 紀錄：同時要搜尋是否有下一頁的資料
- 模糊查詢功能
	- db 的 `like`
	- 模糊搜尋 `like`
- 兩者合用
	- 將 `cursor.execute` 內容用變數去做調整並加上對應搜尋條件
- 解決 400 錯誤
	- Syntax Error and Exception Handling
	- 紀錄：`/api/attraction/{attractionId}` 中使用了 exception 處理錯誤 id ，但還是都會是 200 成功。後來先改成用 JSONResponse 去處理，其他 500 問題之後解決

## AWS EC2（Elastic Compute Cloud，雲端虛擬機）
- 安裝步驟 ⛳️⛳️⛳️
	- Step 1: 啟動 AWS EC2 Instance
	- Step2:透過SSH連線至EC2  
	- Step 3:安裝Git  
	- Step4:拉取專案代碼  
	- Step 5: 安裝 MySQL  
	- Step6:安装Python 與與环環境  
	- Step 7:啟動 Web服務  
	- Step 8:配置AWS Elastic IP  
	- Step9:確保網站可訪問  
	- Step10:確保服務持持運行  
	- Step11:重新連線  
- 匯入 db
	- 備份、還原資料庫
- python 連線到 ec2 mysql
	- 問題：連線不上出現錯誤
		- 檢查了以下：
			- 確保MySQL 允許外部連線
			- 在EC2安全組(Security Group)允許MySQL連線
			- 確保防火牆未阻擋端口
			- 修改MySQL權限,允許遠端連線
		- 使用 root 遇到連線問題，後來想到在 ec2 mysql 中有建立過新用戶，所以拿新用戶測試看看，中間也是 error ，但是改了密碼並且增加新用戶的權限後，利用新用戶進行連線成功了
		- 雖然有點搞不懂為什麼，但是對 root 就也一樣改了密碼後，就成功連線了（依舊問號，更新前後跟這兩個用戶的密碼都是同一個）
		- gpt 解釋：
			- 從本機（EC2）連 `root`：MySQL 期待使用 `auth_socket` 進行身份驗證，而不是密碼，所以當你嘗試用密碼登入時，會被拒絕。
			- 從遠端連 `root`：`caching_sha2_password` 插件需要正確的密碼，但可能之前密碼沒有設置或記錄錯誤，導致「Access Denied」。
			- **`auth_socket` 插件問題**：最初 `root` 用戶在 `localhost` 使用 `auth_socket`，導致密碼登入失敗。
			- **密碼未正確設定**：即使 `root` 在 `%` 使用 `caching_sha2_password`，但可能密碼不正確或未設定，導致遠端連線被拒。
			- **修改了 `root` 的身份驗證方式並設置了密碼**，讓 `root`：
				- 在 **本機（localhost）** 使用 `caching_sha2_password`（密碼登入）。
				- 在 **遠端（%）** 使用 `caching_sha2_password` 並有正確的密碼。
- 換成 zsh 並且安裝 auto-suggestion
	- 要先安裝 oh-my-zsh 才有用，前面直接安裝 auto-suggestion 跑不動還有問題
- 檢視 branch 的狀態 
- mysql 密碼撈不到
	- 後來想到是因為 .env 檔案在本地開發中，所以應該要在 ec2 中手動放上 .env, .gitignore 檔案


## 紀錄
- **正常狀況下**不需要在 EC2 上直接操作 Git 的分支（branch）。開發和版本控制的工作應該主要在你的本機環境中進行（例如：VSCode），然後將程式碼推送到 GitHub 或其他遠端代管平台，再在 EC2 上拉取最新的代碼並進行部署。這樣能確保開發流程的清晰與可控。
	- 在以下情況下，可能會希望在 EC2 上測試某個分支：
	- 緊急修復：如果某個分支有緊急修復並需要立刻部署，你可以先在 EC2 上測試這個分支，確保沒問題後再推到生產環境。
	- 測試不同版本：如果你想在 EC2 上測試不同的版本或功能，尤其是在多個分支間的測試。
	- 為何不建議在 EC2 上頻繁測試分支？
	- 開發流程不清晰：頻繁在 EC2 上測試分支會使代碼管理流程混亂，尤其是當多個開發者在同一 EC2 上工作時。
	- 錯過本地開發工具優勢：本地開發環境（如 VSCode）提供了更多的工具來協助開發，如代碼補全、調試工具等，這些在 EC2 上是無法完全替代的。
	- 總結來說，雖然可以在 EC2 上測試分支，但如果你只是進行日常開發和測試，還是建議將本地開發工作集中在本機環境，並僅將最終的、經過測試的版本推送到 EC2 部署和運行。