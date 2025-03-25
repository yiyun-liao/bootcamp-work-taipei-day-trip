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
        console.log(index, 'done');
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