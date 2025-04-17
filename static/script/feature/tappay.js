import { logout } from "../components/LoginAndSignup.js";

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
        isMaskCreditCardNumber: true,
        maskCreditCardNumberRange: {
            beginIndex: 6,
            endIndex: 11
        }
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
        createOrder(prime)
        })
    })
}

async function createOrder(){
    const token = localStorage.getItem('token');
    try{
        const response = fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prime: prime,
                order: {
                // 可以附上訂單內容
                price: 2000,
                trip: { /* 旅程資訊 */ },
                contact: { /* 聯絡人資訊 */ }
                }
            })
        })

        if (response.status === 403){
            alert('請重新登入');
            logout();
        } else if (response.status === 200){
            console.log("付款成功");
            window.location.href = "/thankyou";
        } else {
            alert('請重新預約');
        } 

    }
    catch(error){
        console.error('Error fetching data', error);
        alert('Error fetching data', error);
    }    
}