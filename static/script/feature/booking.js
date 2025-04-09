import { loginAndSignupPop } from "./HeaderAndFooter.js";
import { logout } from "../components/LoginAndSignup.js";

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
            logout();
        } else if (response.status === 200){
            console.log("增加成功");
            window.location.href = "/booking";
        } else {
            alert('請重新增加');
        } 

    }
    catch(error){
        console.error('Error fetching data', error);
        alert('行程增加失敗，請重新增加');
    }
}

export async function getBookingData(userData){
    const token = localStorage.getItem('token');
    const bookingNotExist = document.getElementById('booking-not-exist')
    const bookingExist = document.getElementById('booking-exist')
    console.log("getBookingData",userData)
    try{
        const response = await fetch("api/booking",{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }        
        })

        if (response.status === 403){
            alert('請重新登入');
            logout();
        };
        const data = await response.json();
        console.log("getBookingData booking data",data)
        if (data !== null){
            bookingNotExist.remove();
            renderBookingPage(userData, data.data);
        }else{
            bookingExist.style.display = "none";
            bookingNotExist.style.display = "block";
            const bookingGreeting = document.querySelector('.booking-greeting');
            bookingGreeting.textContent = `您好，${userData.name}，待預訂的行程如下：`;
        }
    }    
    catch(error){
        console.error('Error fetching data', error);
    }
}

function renderBookingPage(userData, data=null){
    console.log(data, userData)
    const bookingGreeting = document.querySelector('.booking-greeting');
    const bookingInfoPic = document.querySelector('.booking-info-pic');
    const bookingInfoDetailAttraction = document.querySelector('.booking-info-detail-attraction');
    const bookingInfoDetailList = document.querySelectorAll('.booking-info-detail-list');
    const bookingContractName = document.getElementById('booking-contract-name');
    const bookingContractEmail = document.getElementById('booking-contract-email');

    const { attraction, date, time, price} = data;
    const timeText = time === "afternoon" ? "下午 2 點到晚上 9 點" : "早上 9 點到下午 4 點";

    bookingGreeting.textContent = `您好，${userData.name}，待預訂的行程如下：`;
    bookingInfoPic.innerHTML = `<img src= ${attraction.image || ''} alt="${attraction.name} 圖片">`;
    bookingInfoDetailAttraction.textContent = attraction.name;
    bookingInfoDetailList[0].textContent = date || '';
    bookingInfoDetailList[1].textContent = timeText || '';
    bookingInfoDetailList[2].textContent = `新台幣 ${price} 元` || '';
    bookingInfoDetailList[3].textContent = attraction.address || '';
    bookingContractName.value = userData.name || '';
    bookingContractEmail.value = userData.email || '';
}