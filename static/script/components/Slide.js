export function slide(slideArray, location){
    let slideTotal = slideArray.length;
    let currentSlideImg = 0;
    // console.log(slideArray)
    // console.log('current', currentSlideImg, 'slideTotal', slideTotal)
    // console.log(`#${location} .slide-left-btn`)

    const leftBtn = document.querySelector(`#${location} .slide-left-btn`)
    const rightBtn = document.querySelector(`#${location} .slide-right-btn`)
    const paginationGroup = document.querySelector(`#${location} ol`);

    for (let i=0 ; i < slideTotal ; i++){
        const pagination = document.createElement('li');
        pagination.innerHTML=`<i class="mdi mdi-circle-small">`;
        pagination.addEventListener('click', () => {
            currentSlideImg = i;
            slideImg.style.backgroundImage = `url("${slideArray[currentSlideImg] || ''}")`;
            slideBtnState()
        })
        paginationGroup.appendChild(pagination);
    }

    const paginationItems = document.querySelectorAll(`#${location} .pagination li i`)


    leftBtn.addEventListener('click', function(){
        if (currentSlideImg > 0){
            currentSlideImg --;
            // console.log('after click left button, current', currentSlideImg, 'slideTotal', slideTotal)
            slideImg.style.backgroundImage = `url("${slideArray[currentSlideImg] || ''}")`;
            slideBtnState()
        }
    })

    rightBtn.addEventListener('click', function () {
        if (currentSlideImg < slideTotal -1) {
            currentSlideImg++;
            // console.log('after click right button, current', currentSlideImg, 'slideTotal', slideTotal)
            slideImg.style.backgroundImage = `url("${slideArray[currentSlideImg] || ''}")`;
            slideBtnState(); 
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
        paginationItems.forEach((item, index) => {
            if (index === currentSlideImg){
                item.classList.add('mdi-circle-small-active')
            }else{
                item.classList.remove('mdi-circle-small-active')
            }
        })
    }

    slideBtnState()
}