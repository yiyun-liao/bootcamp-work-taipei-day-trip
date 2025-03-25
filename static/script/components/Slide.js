export function slide(slideArray, location){
    const slideImg = document.querySelector(`#${location}`);
    slideImg.style.backgroundImage = `url("${slideArray[0] || ''}")`;

    let slideTotal = slideArray.length;
    let currentSlideImg = 0;
    console.log(slideArray)
    console.log('current', currentSlideImg, 'slideTotal', slideTotal)
    console.log(`#${location} .slide-left-btn`)
    
    const leftBtn = document.querySelector(`#${location} .slide-left-btn`)
    const rightBtn = document.querySelector(`#${location} .slide-right-btn`)

    leftBtn.addEventListener('click', function(){
        if (currentSlideImg > 0){
            currentSlideImg --;
            console.log('after click left button, current', currentSlideImg, 'slideTotal', slideTotal)
            slideImg.style.backgroundImage = `url("${slideArray[currentSlideImg] || ''}")`;
            slideBtnState()
        }
    })

    rightBtn.addEventListener('click', function () {
        if (currentSlideImg < slideTotal -1) {
            currentSlideImg++;
            console.log('after click right button, current', currentSlideImg, 'slideTotal', slideTotal)
            slideImg.style.backgroundImage = `url("${slideArray[currentSlideImg] || ''}")`;
            slideBtnState(); // 更新按鈕顯示
        }
    });



    function slideBtnState(){
        console.log('slideBtnState', currentSlideImg, 'slideTotal', slideTotal)
        if (slideTotal <= 0) return;
        if (currentSlideImg <= 0){
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'block';
        }else if (0 < currentSlideImg && currentSlideImg < slideTotal - 1){
            leftBtn.style.display = 'block';
            rightBtn.style.display = 'block';
        }else if (currentSlideImg === slideTotal - 1){
            leftBtn.style.display = 'block';
            rightBtn.style.display = 'none';
        }else{
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';            
        }
    }

    slideBtnState()
}