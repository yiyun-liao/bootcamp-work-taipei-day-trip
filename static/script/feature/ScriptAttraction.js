import { fetchData } from "../components/FetchData.js"


export async function getAttractionDetails(id){
    const url = `/api/attraction/${id}`;
    const data = await fetchData(url);
    renderAttractionPage(data.data)    
};

function renderAttractionPage (attractionPage){
    const slide = document.querySelector('.attraction-slide');
    const name = document.querySelector('.attraction-simple-intro h3');
    const category = document.querySelector('.attraction-simple-intro p');
    slide.style.backgroundImage = `url('${attractionPage.images[0] || ""}')`;
    name.textContent = attractionPage.name || '';
    category.textContent = attractionPage.category || '';
    
    const desc = [attractionPage.description, attractionPage.address, attractionPage.transport];
    document.querySelectorAll('.attraction-desc-p').forEach((p, index) => { 
        p.textContent = desc[index] || '' ; 
    })
}