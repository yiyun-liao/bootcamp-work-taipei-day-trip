export async function renderHeaderAndFooter(){
    try{
        const response = await fetch("/static/header.html")
        const html = await response.text();
        console.log('Fetched header:', html);
        document.body.insertAdjacentHTML('afterbegin', html);
        setHeaderAction()
    } catch(error){
        console.error('Error fetching data:', error);
    }
        
    const footer = document.createElement('footer');
    footer.innerHTML=`
    <div>
    <p class="body-bold">COPYRIGHT © 2021 台北一日遊</p>
    </div>
    `;
    document.body.appendChild(footer);
    
    }
    
function setHeaderAction(){
    document.querySelector('header nav h2').addEventListener('click', ()=>{
        window.location.href='/';
    })
    
}
    // const header = document.createElement('header');
    // header.innerHTML=`
    //     <nav>
    //         <h2>台北一日遊</h2>
    //         <div>
    //             <button class="body-med btn-med-plain">預定行程</button>
    //             <button class="body-med btn-med-plain">登入/註冊</button>
    //         </div>
    //     </nav>
    // `;
    // document.body.prepend(header);