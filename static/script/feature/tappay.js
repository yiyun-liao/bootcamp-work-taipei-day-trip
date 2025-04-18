import { logout } from "../components/LoginAndSignup.js";
import { getOrderAttraction } from "./booking.js";
import { fetchData } from "../components/FetchData.js"

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
        fetchCreateOrder(orderDetail)
    })
}

async function fetchCreateOrder(order){
    const token = localStorage.getItem('token');
    try{
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(order)
        })

        const result = await response.json(); 
        console.log("Response Status:", response.status);
        console.log("Response Body:", result);
        if (response.status === 403) {
            alert('請重新登入');
            logout();
        } else if (response.status === 200) {
            const paymentStatus = result.data?.payment?.status;
            const paymentMessage = result.data?.payment?.message || "付款結果未知";

            if (paymentStatus === 0) {
                const orderNumber = result.data?.number;
                console.log("付款成功", orderNumber);
                window.location.href = `/thankyou/${orderNumber}`;
            } else {
                alert(paymentMessage); // 顯示後端傳回來的錯誤訊息（如 IP mismatch）
            }
        } else {
            alert('請重新預約');
        }

    }
    catch(error){
        console.error('Error fetching data', error);
        alert('Error fetching data', error);
    }    
}



export async function getOrderDetails(orderNumber){
    const url = `/api/order/${orderNumber}`;
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        console.log(data)
        if (data.status === 403){
            alert('請重新登入');
            logout();
        } else if (data.status === 200){
            console.log(data)  
        } else {
            window.location.href = "/";
        } 
    } catch(error){
        console.error('Error fetching data:', error);
    }
};