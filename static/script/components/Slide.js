export function slide(slideTotal, containerId){
    let currentIndex = 0;
    // console.log('current', currentIndex, 'slideTotal', slideTotal)
    // console.log(`#${containerId} .slide-left-btn`)

    const leftBtn = document.querySelector(`#${containerId} .slide-left-btn`)
    const rightBtn = document.querySelector(`#${containerId} .slide-right-btn`)
    const paginationGroup = document.querySelector(`#${containerId} .pagination`);
    const slideContainer = document.querySelector(`#${containerId} .slide-container`);
    let slideWidth = document.querySelector(`#${containerId} .slide-img-container`).offsetWidth;
    // console.log(slideContainer.offsetWidth, slideWidth)

    for (let i=0 ; i < slideTotal ; i++){
        const pagination = document.createElement('li');
        pagination.innerHTML=`<i class="mdi mdi-circle-small">`;
        pagination.addEventListener('click', () => {
            currentIndex = i;
            changeSlidePosition();
            slideBtnState()
        })
        paginationGroup.appendChild(pagination);
    }

    const paginationItems = document.querySelectorAll(`#${containerId} .pagination li i`)


    leftBtn.addEventListener('click', function(){
        if (currentIndex > 0){
            currentIndex --;
            // console.log('after click left button, current', currentIndex, 'slideTotal', slideTotal)
            changeSlidePosition();
            slideBtnState()
        }
    })

    rightBtn.addEventListener('click', function () {
        if (currentIndex < slideTotal -1) {
            currentIndex++;
            // console.log('after click right button, current', currentIndex, 'slideTotal', slideTotal)
            changeSlidePosition();
            slideBtnState(); 
        }
    });

    function changeSlidePosition(){
        slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        // console.log(`translateX(-${currentIndex * slideWidth}px)`)
    };


    function slideBtnState(){
        // console.log('slideBtnState', currentIndex, 'slideTotal', slideTotal)
        if (slideTotal <= 0) return;
        if (currentIndex <= 0){
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'block';
        }else if (0 < currentIndex && currentIndex < slideTotal - 1){
            leftBtn.style.display = 'block';
            rightBtn.style.display = 'block';
        }else if (currentIndex === slideTotal - 1){
            leftBtn.style.display = 'block';
            rightBtn.style.display = 'none';
        }else{
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';            
        }
        paginationItems.forEach((item, index) => {
            if (index === currentIndex){
                item.classList.add('mdi-circle-small-active')
            }else{
                item.classList.remove('mdi-circle-small-active')
            }
        })
    };

    slideBtnState();
    window.addEventListener('resize',()=>{
        const newSlideWidth = document.querySelector(`#${containerId} .slide-img-container`).offsetWidth;
        slideWidth = newSlideWidth;
        // console.log(slideWidth)
        changeSlidePosition();
    } )
}
