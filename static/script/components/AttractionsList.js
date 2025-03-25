import { getAttractions, isLoading, nextPage, currentKeyword } from "../feature/ScriptIndex.js";

export function renderAttractionsGallery(attractionsData){
    const attractionList = document.querySelector("#attraction ol");
    console.log(attractionsData)
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


