import { fetchData } from "../components/FetchData.js"


export async function getAttractionDetails(id){
    const url = `/api/attraction/${id}`
    const attractionDetails = await fetchData(url);
    const data = attractionDetails.data;
    const name = document.querySelector('.attraction-simple-intro h3');
    name.textContent = data.name;
    const category = document.querySelector('.attraction-simple-intro p');
    category.textContent = data.category;
    const desc = [data.description, data.address, data.transport]
    document.querySelectorAll('.attraction-desc-p').forEach((p, index) => {
        p.textContent = desc[index] || '' ;
    });
}