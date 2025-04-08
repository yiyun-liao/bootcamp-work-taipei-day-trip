import { login, signup, logout } from "./LoginAndSignup.js";

export async function renderHeaderAndFooter(userState= false){
    try{
        const response = await fetch("/static/header.html")
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
        setHeaderAction(userState);
 
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
    // console.log('render header')
}
    
function setHeaderAction(userState= false){
    document.querySelector('header nav h2').addEventListener('click', ()=>{
        window.location.href='/';
    })
    document.querySelector('#booking-page-btn').addEventListener('click', ()=>{
        if(userState){
            window.location.href='/booking';
        }else{
            loginAndSignupPop('/booking');
        }
    })
    // console.log(userState)
    const loginAndSignupBtn = document.getElementById('login-and-signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    if (userState){
        logoutBtn.style.display = 'flex';
        document.getElementById('logout-btn').addEventListener('click', logout);
        // console.log('add logout event listening')
    }else{
        loginAndSignupBtn.style.display = 'flex';
        document.getElementById('login-and-signup-btn').addEventListener('click',(e) => {
            e.preventDefault();
            loginAndSignupPop(window.location.href);
            });
        console.log('add login/signup event listening')
    }
}

function loginAndSignupPop(targetURL= false){
    const openLoginPop = document.getElementById('login-pop')
    const openSignupPop = document.getElementById('signup-pop')
    // open
    openLoginPop.style.display = 'block';

    // close
    document.querySelectorAll('.pop-body .mdi-close').forEach(btn=>{
        btn.addEventListener('click', function(){
            openLoginPop.style.display = 'none';
            openSignupPop.style.display = 'none';
        })
    })
    // switch
    document.querySelectorAll('.pop-more .btn-med-plain').forEach(btn=>{
        btn.addEventListener('click', function(){
            if(btn.textContent === '點此登入'){
                openLoginPop.style.display = 'block';
                openSignupPop.style.display = 'none'; 
            }else{
                openLoginPop.style.display = 'none';
                openSignupPop.style.display = 'block';
            }
        })
    })

    console.log("target",targetURL)
    console.log("current",window.location.href)
    const redirectURL = targetURL || window.location.href;
    document.getElementById('login-form').addEventListener('submit',(e) => {
        e.preventDefault();
        login(e, redirectURL);
        },{ once: true });
    document.getElementById('signup-form').addEventListener('submit',(e) => {
        e.preventDefault();
        login(e, redirectURL);
        },{ once: true });
    // console.log('切換畫面')
}