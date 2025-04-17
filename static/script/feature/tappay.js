export function createOrderController(){
    TPDirect.setupSDK(
        159915,           // 從 TapPay Dashboard 取得
        'app_DU3Gn2IFwnyTAaUzJVjNWAtcQLy1cemI0qIrWLAtvJUkHDaUr2x7NJuemylb',        // 前端用的 App Key
        'sandbox'              // 或 'production'
    );
    TPDirect.card.setup({
        fields: {
            number: {
            element: '#booking-credit-card-number',
            placeholder: '**** **** **** ****'
            },
            expirationDate: {
            element: '#booking-credit-card-exp',
            placeholder: 'MM / YY'
            },
            ccv: {
            element: '#booking-credit-card-ccv',
            placeholder: 'ccv'
            }
        },
        // styles: {
        //     'input': {
        //       'min-width': '200px',
        //       'min-height': '38px',
        //       'padding': '10px',
        //       'color': 'var(--color-black-900)',
        //       'border-radius': '5px',
        //       'border': '1px solid var(--color-gray-20)',
        //       'outline': 'none',
        //     },
        // }
    });
    document.querySelector('#submit-button').addEventListener('click', function (event) {
        event.preventDefault()
      
        // 檢查輸入欄位是否填寫正確
        const tappayStatus = TPDirect.card.getTappayFieldsStatus()
        if (tappayStatus.canGetPrime === false) {
          alert('請確認信用卡資料填寫正確')
          return
        }
      
        // 取得 prime
        TPDirect.card.getPrime(function (result) {
            if (result.status !== 0) {
            alert('取得 prime 失敗：' + result.msg)
            return
        }
        
        const prime = result.card.prime
        console.log('Get Prime:', prime)
      
        // 接下來把 prime 傳送給後端進行付款請求
        // fetch('/api/pay', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         prime: prime,
        //         order: {
        //         // 可以附上訂單內容
        //         price: 2000,
        //         trip: { /* 旅程資訊 */ },
        //         contact: { /* 聯絡人資訊 */ }
        //         }
        //     })
        //     }).then(res => res.json())
        //     .then(data => {
        //         if (data.success) {
        //         alert('付款成功')
        //         } else {
        //         alert('付款失敗')
        //         }
        //     })
        })
    })
}