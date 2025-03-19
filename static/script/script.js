document.addEventListener('DOMContentLoaded', () => {
    getAttractions();
    getMetro();
    window.addEventListener('scroll', handleScroll);
    searchMetro();
});


// render attractions and use input/chip search===========================================================================
let nextPage = 0 // 全域變數
let isLoading = false; //避免重複請求
let currentKeyword = ""; //search keyword

async function getAttractions(page=0, keyword=""){
    if (isLoading || nextPage === null) return;
    isLoading = true;

    const url = keyword ? `/api/attractions?page=${page}&keyword=${keyword}` : `/api/attractions?page=${page}` ;
    const data = await fetchData(url);

    if (page === 0){
        document.querySelector("#attraction ol").innerHTML= "";
    }
    
    // console.log(data.data);
    renderAttractions(data.data);
    nextPage = data.nextPage; 
    // console.log(nextPage)
    isLoading = false;
}

function renderAttractions(attractionsData){
    const attractionList = document.querySelector("#attraction ol");
    // attractionList.innerHTML= "";
    attractionsData.forEach(item => {
        const attractionItem = document.createElement('li');        
        attractionItem.innerHTML =` 
            <div class="attraction-thumbnail" style="background-image: url('${item.images[0] || "" }');")>
                <div class="attraction-name body-bold">${item.name}</div>
            </div>
            <div class="mrt-and-category">
                <p class="attraction-mrt">${item.mrt}</p>
                <p class="attraction-category">${item.category}</p>
            </div>
            `;        
        attractionList.appendChild(attractionItem);
    });
}

function handleScroll(){
    if (isLoading || nextPage === null) return;

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100){ //footer 104px
        // console.log("load next page", `${scrollHeight - (scrollTop + clientHeight)}`)
        // console.log(nextPage)
        getAttractions(nextPage, currentKeyword);
    }
}

function searchMetro(){
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
async function getMetro(){
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


// fetchData ===========================================================================
async function fetchData(url){
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        return await response.json();
    } catch(error){
        console.error('Error fetching data:', error);
    }
}


// carousel ===========================================================================
function carousel(){
    const carouselContainer = document.querySelector('#carousel-container');
    const carouselList = carouselContainer.querySelector('ol');
    const carouselRightBtn = document.getElementById('carousel-right-btn');
    const carouselLeftBtn = document.getElementById('carousel-left-btn');
    
    function carouselBtnState(){
        let carouselContainerTotalWidth = carouselList.scrollWidth;
        let carouselContainerWidth = carouselContainer.clientWidth;
        let carouselOffsetLeft = carouselList.scrollLeft;

        // console.log("總長度", carouselContainerTotalWidth)
        // console.log("可視範圍", carouselContainerWidth)
        // console.log("偏移位置", carouselOffsetLeft)

        // 修正小數點誤差，確保按鈕顯示正確
        const isRightBtnHide = Math.ceil(carouselOffsetLeft + carouselContainerWidth) >= carouselContainerTotalWidth;
        const isLeftBtnHide = Math.ceil(carouselOffsetLeft) <= 0;
        
        if (carouselContainerTotalWidth > carouselContainerWidth){
            carouselRightBtn.style.display = isRightBtnHide  ? 'none' : 'block' ;
            carouselLeftBtn.style.display = isLeftBtnHide ? 'none' : 'block' ;
        }else{
            carouselRightBtn.style.display = "none";
            carouselLeftBtn.style.display = "none";
        }
    }
    
    carouselLeftBtn.addEventListener('click', function(){
        carouselList.scrollBy({left: -carouselContainer.clientWidth * 0.8, behavior: "smooth"});
        setTimeout(carouselBtnState, 300); // 等滾動完成後再檢查按鈕狀態
        // console.log("Left button clicked!");
    });
    carouselRightBtn.addEventListener('click', function(){
        carouselList.scrollBy({left: carouselContainer.clientWidth * 0.8, behavior: "smooth"});
        setTimeout(carouselBtnState, 300); // 等滾動完成後再檢查按鈕狀態
        // console.log("Right button clicked!");
    });
    window.addEventListener('resize', carouselBtnState); // 新增只要畫面尺寸不同就改變，不需要整頁 refresh
    carouselBtnState();
}