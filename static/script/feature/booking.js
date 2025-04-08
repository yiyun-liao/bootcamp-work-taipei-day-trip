import { loginAndSignupPop } from "../components/HeaderAndFooter.js";

export function collectBookingData(){
    const dateInput = document.getElementById('attraction-dateInput');
    const timeInput = document.querySelector('input[name="attraction-time-selection"]:checked')
    const price = document.getElementById('attraction-price')
    const currentPage = window.location.href;
    const attractionId = parseInt(currentPage.split('/').pop());
    const priceInt = parseInt(price.textContent.replace(/[^\d]/g, ''));

    const bookData = {
        attractionId : attractionId, 
        date : dateInput.value, 
        time : timeInput.value, 
        price : priceInt
    };
    console.log(bookData);
    const token = localStorage.getItem('token');
    if (token){
        booking(bookData);
    }else{
        loginAndSignupPop(currentPage);        
    }
}

async function booking(bookData){
    const token = localStorage.getItem('token');
    try{
        const response = await fetch("/api/booking",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData),
        })

        if (response.status === 403){
            alert('請重新登入');
        } else if (response.status === 400 || response.status === 500){
            alert('請重新增加');
        } else if (response.status === 200){
            console.log("增加成功");
            window.location.href = "/booking";
        }

    }
    catch(error){
        console.error('Error fetching data', error);
        alert('行程增加失敗，請重新增加');
    }
}