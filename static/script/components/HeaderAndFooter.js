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
    
}
    
function setHeaderAction(userState= false){
    document.querySelector('header nav h2').addEventListener('click', ()=>{
        window.location.href='/';
    })
    // console.log(userState)
    const loginAndSignupBtn = document.getElementById('login-and-signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    if (userState){
        logoutBtn.style.display = 'flex';
        logout();
    }else{
        loginAndSignupBtn.style.display = 'flex';
        loginAndSignupPop();
    }
}

function loginAndSignupPop(){
    const openLoginPop = document.getElementById('login-pop')
    const openSignupPop = document.getElementById('signup-pop')
    // open
    document.getElementById('login-and-signup-btn').addEventListener('click',function(){
        openLoginPop.style.display = 'block';
        login(); 
    })
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
                login();                 
            }else{
                openLoginPop.style.display = 'none';
                openSignupPop.style.display = 'block';
                signup();                            
            }
        })
    })
}