import { login } from "./LoginAndSignup.js";

export async function renderHeaderAndFooter(){
    try{
        const response = await fetch("/static/header.html")
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
        setHeaderAction();
        login()
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
