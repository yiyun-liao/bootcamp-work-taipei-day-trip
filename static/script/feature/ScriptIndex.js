import { fetchData } from "../components/FetchData.js";
import { carousel } from "../components/carousel.js";
import { renderAttractions } from "../components/AttractionsList.js";

// render attractions and use input/chip search===========================================================================
let nextPage = 0 // 全域變數
let isLoading = false; //避免重複請求
let currentKeyword = ""; //search keyword

export async function getAttractions(page=0, keyword=""){
    if (isLoading || nextPage === null) return;
    isLoading = true;
    console.log("run attractions")
    const url = keyword ? `/api/attractions?page=${page}&keyword=${keyword}` : `/api/attractions?page=${page}` ;
    console.log("fetchData 即將呼叫，URL:", url);
    const data = await fetchData(url);
    console.log("fetchData 回傳:", data);
    if (page === 0){
        document.querySelector("#attraction ol").innerHTML= "";
    }
    
    // console.log(data.data);
    renderAttractions(data.data);
    nextPage = data.nextPage; 
    // console.log(nextPage)
    isLoading = false;
}


export function searchMetro(){
    const searchMetroInput = document.getElementById("search-metro-input");
    const searchMetroBtn = document.getElementById("search-metro-btn");
    
    searchMetroBtn.addEventListener("click", function() {
        currentKeyword = searchMetroInput.value.trim();
        nextPage = 0;
        getAttractions(0, currentKeyword);
    });

    searchMetroInput.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            searchMetroBtn.click(); 
        }
    })

    document.querySelectorAll("#carousel-container ol li").forEach(item => {
        item.addEventListener('click', function(){
            currentKeyword = this.textContent.trim();
            searchMetroInput.value = currentKeyword;
            nextPage = 0;
            getAttractions(0, currentKeyword);
        })
    })
}

// render metro chip ===========================================================================
export async function getMetro(){
    const data = await fetchData("/api/mrts");
    // console.log(data.data);
    renderMetroChip(data.data);
}

function renderMetroChip(metroData){
    const attractionList = document.querySelector("#carousel-container ol");
    metroData.forEach(item => {
        const metroItem = document.createElement('li');        
        metroItem.innerHTML =item;        
        attractionList.appendChild(metroItem);
    });
    carousel();
    searchMetro();
}

export {isLoading};