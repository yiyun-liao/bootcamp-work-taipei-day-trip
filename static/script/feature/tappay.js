import { logout } from "../components/LoginAndSignup.js";
import { getOrderAttraction } from "./booking.js";

let bookAttractionData = {};
window.addEventListener("orderDataReady", (event) => {
    bookAttractionData = event.detail;
    console.log("從 event 拿到 orderAttraction:", bookAttractionData);
});

export function createOrderController(){
    TPDirect.setupSDK(
        159915,
        'app_DU3Gn2IFwnyTAaUzJVjNWAtcQLy1cemI0qIrWLAtvJUkHDaUr2x7NJuemylb',
        'sandbox'
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
}

export function createOrder(){
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
        
        const bookingContractName = document.getElementById('booking-contract-name');
        const bookingContractEmail = document.getElementById('booking-contract-email');
        const bookingContractPhone = document.getElementById('booking-contract-phone');
        const orderDetail = {
            "prime": prime,
            "order": {
                "price": bookAttractionData.price,
                "trip": {
                    "attraction": {
                    "id": bookAttractionData.attraction.id,
                    "name": bookAttractionData.attraction.name,
                    "address": bookAttractionData.attraction.address,
                    "image": bookAttractionData.attraction.image
                    },
                    "date": bookAttractionData.date,
                    "time": bookAttractionData.time
                },
                "contact": {
                    "name": bookingContractName.value,
                    "email": bookingContractEmail.value,
                    "phone": bookingContractPhone.value
                }
            }
        }
        // console.log(orderDetail)
        createOrder(orderDetail)
    })
}

async function createOrder(order){
    const token = localStorage.getItem('token');
    try{
        const response = fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(order)
        })

        if (response.status === 403){
            alert('請重新登入');
            logout();
        } else if (response.status === 200){
            console.log("付款成功");
            window.location.href = "/thankyou";
            // 補上 response 的 order id
        } else {
            alert('請重新預約');
        } 

    }
    catch(error){
        console.error('Error fetching data', error);
        alert('Error fetching data', error);
    }    
}