export function slide(){
    // const carouselContainer = document.querySelector('#carousel-container');
    // const carouselList = carouselContainer.querySelector('ol');
    // const carouselRightBtn = document.getElementById('carousel-right-btn');
    // const carouselLeftBtn = document.getElementById('carousel-left-btn');
    
    // function carouselBtnState(){
    //     let carouselContainerTotalWidth = carouselList.scrollWidth;
    //     let carouselContainerWidth = carouselContainer.clientWidth;
    //     let carouselOffsetLeft = carouselList.scrollLeft;

    //     // console.log("總長度", carouselContainerTotalWidth)
    //     // console.log("可視範圍", carouselContainerWidth)
    //     // console.log("偏移位置", carouselOffsetLeft)

    //     // 修正小數點誤差，確保按鈕顯示正確
    //     const isRightBtnHide = Math.ceil(carouselOffsetLeft + carouselContainerWidth) >= carouselContainerTotalWidth;
    //     const isLeftBtnHide = Math.ceil(carouselOffsetLeft) <= 0;
        
    //     if (carouselContainerTotalWidth > carouselContainerWidth){
    //         carouselRightBtn.style.display = isRightBtnHide  ? 'none' : 'block' ;
    //         carouselLeftBtn.style.display = isLeftBtnHide ? 'none' : 'block' ;
    //     }else{
    //         carouselRightBtn.style.display = "none";
    //         carouselLeftBtn.style.display = "none";
    //     }
    // }
    
    // carouselLeftBtn.addEventListener('click', function(){
    //     carouselList.scrollBy({left: -carouselContainer.clientWidth * 0.8, behavior: "smooth"});
    //     setTimeout(carouselBtnState, 300); // 等滾動完成後再檢查按鈕狀態
    //     // console.log("Left button clicked!");
    // });
    // carouselRightBtn.addEventListener('click', function(){
    //     carouselList.scrollBy({left: carouselContainer.clientWidth * 0.8, behavior: "smooth"});
    //     setTimeout(carouselBtnState, 300); // 等滾動完成後再檢查按鈕狀態
    //     // console.log("Right button clicked!");
    // });
    // window.addEventListener('resize', carouselBtnState); // 新增只要畫面尺寸不同就改變，不需要整頁 refresh
    // carouselBtnState();
}