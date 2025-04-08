import { fetchData } from "../components/FetchData.js"
import { slide } from "../components/Slide.js";
import { collectBookingData } from "./booking.js";

export async function getAttractionDetails(id){
    const url = `/api/attraction/${id}`;
    const data = await fetchData(url);
    renderAttractionPage(data.data)    
};

function renderAttractionPage (attractionPage){
    // render image
    const slideImgContainer = document.querySelector('.slide-container');
    const slideTotal = attractionPage.images.length;
    attractionPage.images.forEach((item, index) => {
        const newImg = document.createElement('div');
        newImg.innerHTML=`<img src= ${item || ''} alt="image-${index}">`;
        newImg.classList.add('slide-img-container');
        // console.log(index, 'done');
        slideImgContainer.appendChild(newImg);
    })

    // render container
    const slideName = document.querySelector('.attraction-simple-intro h3');
    const slideCategory = document.querySelector('.attraction-simple-intro p');
    slideName.textContent = attractionPage.name || '';
    slideCategory.textContent = attractionPage.category || '';
    
    const slideDesc = [attractionPage.description ?? '', attractionPage.address ?? '', attractionPage.transport ?? ''];
    document.querySelectorAll('.attraction-desc-p').forEach((p, index) => { 
        p.textContent = slideDesc[index] || '' ; 
    });


    //remove skeleton
    document.querySelectorAll('.skeleton.skeleton-container').forEach(item => item.remove());
    document.querySelectorAll('.skeleton-slide-img').forEach(item => item.remove());

    document.getElementById('attraction-book-btn').addEventListener('click', collectBookingData);

    slide(slideTotal, 'attraction-slide');
    checkAttractionPrice();
    PresetDate()
}

function checkAttractionPrice(){
    const timeRadios = document.querySelectorAll('input[name="attraction-time-selection"]');
    const attractionPrice = document.getElementById('attraction-price');
    timeRadios.forEach(radio => {
        radio.addEventListener('change', function(){
            if(this.checked){
                attractionPrice.textContent = this.value === 'morning' ? '新台幣 2000 元' : '新台幣 2500 元';
            }
        })
    })

    //預設選擇
    if (timeRadios.length > 0){
        timeRadios[0].checked = true;
        timeRadios[0].dispatchEvent(new Event('change'))
    }
}

function PresetDate(){
    const dateInput = document.getElementById("attraction-dateInput");
    
    const today = new Date().toISOString().split('T')[0];  // 格式：yyyy-mm-dd
    dateInput.value = today; 
}