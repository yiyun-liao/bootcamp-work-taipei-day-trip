export function renderHeaderAndFooter(){
    fetch("static/header.html")
        .then(response => response.text())
        .then(html =>{
            document.body.insertAdjacentElement('afterbegin', html);
        })
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
    document.body.appendChild(footer);
    
    const footer = document.createElement('footer');
    footer.innerHTML=`
        <div>
            <p class="body-bold">COPYRIGHT © 2021 台北一日遊</p>
        </div>
    `;
    document.querySelector('header nav h2').addEventListener('click', ()=>{
        window.location.href='/';
    })
}