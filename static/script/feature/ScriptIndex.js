import { fetchData } from "../components/FetchData.js";
import { carousel } from "../components/Carousel.js";

// render attractions and use input/chip search===========================================================================
let nextPage = 0 // 全域變數
let isLoading = false; //避免重複請求
let currentKeyword = ""; //search keyword

export async function getAttractions(page=0, keyword=""){
    if (isLoading || nextPage === null) return;
    isLoading = true;
    const url = keyword ? `/api/attractions?page=${page}&keyword=${keyword}` : `/api/attractions?page=${page}` ;
    const data = await fetchData(url);
    if (page === 0){
        document.querySelector("#attraction ol").innerHTML= "";
    }
    
    renderAttractionsGallery(data.data);
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
    attractionList.innerHTML="";
    metroData.forEach(item => {
        const metroItem = document.createElement('li');        
        metroItem.innerHTML =item;        
        attractionList.appendChild(metroItem);
    });
    carousel();
}



// render attractions gallery===========================================================================
function renderAttractionsGallery(attractionsData){
    const attractionList = document.querySelector("#attraction ol");
    // console.log(attractionsData)
    attractionsData.forEach(item => {
        const attractionItem = document.createElement('li');      
  
        attractionItem.innerHTML =` 
            <div class="attraction-thumbnail" style="background-image: url('${item.images[0] || "" }');")>
                <div class="attraction-name body-bold">${item.name|| "" }</div>
            </div>
            <div class="mrt-and-category">
                <p class="attraction-mrt">${item.mrt|| "" }</p>
                <p class="attraction-category">${item.category|| "" }</p>
            </div>
            `;        
        attractionItem.addEventListener('click', () => {
            window.location.href = `/attraction/${item.id}`;
        })
        attractionList.appendChild(attractionItem);
    });
}

export function handleScroll(){
    if (isLoading || nextPage === null) return;

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100){ //footer 104px
        // console.log("load next page", `${scrollHeight - (scrollTop + clientHeight)}`)
        // console.log(nextPage)
        getAttractions(nextPage, currentKeyword);
    }
}


