export function renderHeaderAndFooter(){
    const header = document.createElement('header');
    const footer = document.createElement('footer');
    header.innerHTML=`
        <nav>
            <h2>台北一日遊</h2>
            <div>
                <button class="body-med">預定行程</button>
                <button class="body-med">登入/註冊</button>
            </div>
        </nav>
    `;
    footer.innerHTML=`
        <div>
            <p class="body-bold">COPYRIGHT © 2021 台北一日遊</p>
        </div>
    `;
    document.body.prepend(header);
    document.body.appendChild(footer);

    document.querySelector('header nav h2').addEventListener('click', ()=>{
        window.location.href='/';
    })
}