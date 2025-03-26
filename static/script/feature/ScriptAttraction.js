import { fetchData } from "../components/FetchData.js"
import { slide } from "../components/Slide.js";

export async function getAttractionDetails(id){
    const url = `/api/attraction/${id}`;
    const data = await fetchData(url);
    renderAttractionPage(data.data)    
};

function renderAttractionPage (attractionPage){
    const slideImgContainer = document.querySelector('.slide-container');
    const slideTotal = attractionPage.images.length;
    attractionPage.images.forEach((item, index) => {
        const newImg = document.createElement('div');
        newImg.innerHTML=`<img src= ${item || ''} alt="image-${index}">`;
        newImg.classList.add('slide-img-container');
        // console.log(index, 'done');
        slideImgContainer.appendChild(newImg);
    })

    const slideName = document.querySelector('.attraction-simple-intro h3');
    const slideCategory = document.querySelector('.attraction-simple-intro p');
    slideName.textContent = attractionPage.name || '';
    slideCategory.textContent = attractionPage.category || '';
    
    const slideDesc = [attractionPage.description ?? '', attractionPage.address ?? '', attractionPage.transport ?? ''];
    document.querySelectorAll('.attraction-desc-p').forEach((p, index) => { 
        p.textContent = slideDesc[index] || '' ; 
    });


    slide(slideTotal, 'attraction-slide');
}

export function checkAttractionPrice(){
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
        console.log('work')
        timeRadios[0].dispatchEvent(new Event('change'))
    }
}