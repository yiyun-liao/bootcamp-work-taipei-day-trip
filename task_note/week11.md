- /attraction/id click to redirect
	- 紀錄：上週測試時第一次連線後端很容易卡住，早上會議後有想到是不是因為同步送了兩個 fetch 需求導致卡住，所以在 js 上補上順序，確實在第一次連線時就順暢了。
	- 紀錄：因為 id 是動態的，所以要另外確認 id ，所以用正規表達式去確認 id 是否是數字
- header and footer modules
- click header h2  to back to index.html
- /attraction/id layout design
	- picture carousel, info, desc
	- rwd
- /api/attraction/${id}
	- 紀錄：原本內容是用這樣寫，雖然看了一個 db 每一欄都有資料，但如果要思考會有沒資料的狀態的話，可能就要明確地一一對應（想到上週的作業沒有思考到是不是會有沒有資料的狀況，因為那時候只有處理 metro 是 null 的狀態）
	- `??`（Nullish Coalescing Operator）和 `||`（Logical OR）
	-
	  ```javascript
	  const desc = [attractionPage.description, attractionPage.address, attractionPage.transport];
	  document.querySelectorAll('.attraction-desc-p').forEach((p, index) => { 
	    p.textContent = desc[index] || '' ; 
	  })
	  // 改成
	  const desc = [attractionPage.description ?? '', attractionPage.address ?? '', attractionPage.transport ?? ''];
	  ```
- component - picture slide and pagination
	- 紀錄：想要使用 component 的維度去設定這個功能，考量到可能單一畫面中不只使用到一次的話就不能用 `id` 去抓，雖然作業上確實只會是使用一次，但還是想說用 class 的方式去做
	- 紀錄： `break`: 強迫中斷迴圈，`break;` 只能用在 `for`、`while`、`switch` 等迴圈內
	- 紀錄：一直很想用 component 的方式做，但是要考量到匯入的圖片資料對應到的按鈕，雖然 querySelectAll 候用 index 可以找到對應的 button 但進來的資料對應到的是哪個 index 一時之間想不到要怎麼對應。後來想到在呼叫 slide() 方法時就限制好特定的 id ，所以改成這樣 `<div class="attraction-slide" id="attraction-slide">` 這樣應該在其他地方要使用該 slide 時只要指定好上層 id 應該就可以應用
	- 紀錄：第一張照片的渲染原本是寫在 slide(slideArray, location) 中，但是這樣會讓第一張圖片很晚才開始渲染，pagination 跟 slide btn 會比圖片早出現。所以將第一張渲染移到 renderAttractionPage (attractionPage) 中做。
	- 紀錄：將 pagination 加上點擊功能
	- 紀錄：現在照片是一張張點擊後渲染，如果要滑頁感，需要在一開始就將照片渲染完，串成一串，利用物理位置去做切換，html, css 的處理方式都要改變
	- 紀錄： 改成一串的時候卡很久，圖片無法正常地變成一條，後來是把按鈕跟分頁顯示另外包在 <div> 中，圖片也另外再包在一個 <div> 中才有成功。並且原本是直接紀錄當前 array 值去做變換圖片，現在要用該值去乘上位移 px
- component - radiobutton
	- 紀錄：預填上半天， `radio` `EventTarget.dispatchEvent()`
	- `<input type="radio">` 中，加上 `name` 屬性 的作用是確保 同一組選項 中只能選擇一個。這是 HTML 表單規範 的標準行為。
	-
	  ```html
	  <!--只有 input 可以被點擊-->
	  <input type="radio" id="radio-morning" name="time-selection" value="morning">
	  <label for="radio-morning">上半天</label>
	  <!--讓整個文字也可以被點擊-->
	  <label for="radio-morning">
	    <input type="radio" id="radio-morning" name="time-selection" value="morning">
	    上半天
	  </label>
	  ```
- add Skeleton Loading Animation
- 紀錄：手機版本 datepicker 會顯示空白，所以改成預設當日來測試手機是否會至少有顯示內容