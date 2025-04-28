- 紀錄：將 /api/booking 資料傳給 api/order 使用，就不用從前端再拿取 value，但因為有分 modules 所以要想辦法將資料傳出來
	- 但因為資料是 fetch 來的，直接呼叫 function 會拿到空的 object 需要等待資料獲取成功才能呼叫 function ，使用 `new CustomEvent` 的方式獲取資料
	- 雖然 module 中沒有直接用到 `getOrderAttraction()` 但因為只有在匯入時，才會去執行 `getOrderAttraction()` -> `setOrderAttraction()` 所以還是必須要 import
- 機會： UUID 加上流水號（需要到 db 中計算當天已經有的訂單數量）
- order form 是否要 FOREIGN KEY
	- id 部分還是有使用，因為 id 是 PRIMARY KEY，其他資料是有可能會更新的，但是訂單是紀錄當下購買內容，所以不會用 join 去做，而是獨立紀錄
- 紀錄：pip3 install requests
- 紀錄：一直付款失敗，原因是忘記把 localhost 的 ip 加上去
- QA
	- POST [api/order]
		- 訂單成立 -> 刪除 booking_state, 更新 order db
	- GET [api/order]
		- url 錯誤訂單編號 -> 導回首頁
		- url 正確 -> 顯示 /thankyou?number={orderNumber}

## 研究
	- `window.dispatchEvent()`
	- ORM
	- Pydantic Models
	- UUID
	  collapsed:: true
		- `order_number = str(uuid.uuid4()).replace("-", "")[:20]`
			- **`uuid.uuid4()`**
				- 產生一個隨機的 UUID（Universally Unique Identifier），長這樣：
				    
				  ```
				  4f9c066e-7ff3-4b7f-8f6f-4f8a99a43a29
				  ```
			- **`str(uuid.uuid4())`**
				- 把 UUID 轉成字串格式。
			- **`.replace("-", "")`**
				- 移除 UUID 中的 `-` 符號：
				    
				  ```
				  4f9c066e7ff34b7f8f6f4f8a99a43a29
				  ```
			- **`[:20]`**
				- 只取前 20 個字元來當作訂單編號：
				    
				  ```
				  4f9c066e7ff34b7f8f6f
				  ```
	- `result.data?.payment?.message`
		- 等同於：
		-
		  ```javascript
		  if (result.data !== undefined && result.data.payment !== undefined) {
		    return result.data.payment.message;
		  } else {
		    return undefined;
		  }
		  ```