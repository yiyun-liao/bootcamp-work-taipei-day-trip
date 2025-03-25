import { fetchData } from "../components/FetchData.js"
import { slide } from "../components/Slide.js";

export async function getAttractionDetails(id){
    const url = `/api/attraction/${id}`;
    const data = await fetchData(url);
    renderAttractionPage(data.data)    
};

function renderAttractionPage (attractionPage){
    // const slideImgContainer = document.querySelector('.slide-container');
    // const slideImg = document.querySelector('.slide-img');

    // for (let i=0 ; i < attractionPage.images.length ; i++){
    //     const newImg = document.createElement('img');
    //     newImg.src = attractionPage.images[i] || ''; 
    //     newImg.alt = `img-${i}`;
    //     newImg.classList.add('slide-img')
    //     slideImgContainer.appendChild(newImg);
    // }

    const slideName = document.querySelector('.attraction-simple-intro h3');
    const slideCategory = document.querySelector('.attraction-simple-intro p');
    slideName.textContent = attractionPage.name || '';
    slideCategory.textContent = attractionPage.category || '';
    
    const slideDesc = [attractionPage.description ?? '', attractionPage.address ?? '', attractionPage.transport ?? ''];
    document.querySelectorAll('.attraction-desc-p').forEach((p, index) => { 
        p.textContent = slideDesc[index] || '' ; 
    });


    // slide(attractionPage.images, 'attraction-slide');
}