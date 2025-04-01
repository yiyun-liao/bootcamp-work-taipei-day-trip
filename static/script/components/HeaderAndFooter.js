import { login } from "./LoginAndSignup.js";

export async function renderHeaderAndFooter(){
    try{
        const response = await fetch("/static/header.html")
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
        setHeaderAction();
        loginAndSignupPop()
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

function loginAndSignupPop(){
    const openLoginPop = document.getElementById('login-pop')
    const openSignupPop = document.getElementById('signup-pop')
    // open
    document.getElementById('login-and-signup').addEventListener('click',function(){
        openLoginPop.style.display = 'block';
    })
    // close
    document.querySelectorAll('.pop-body .mdi-close').forEach(btn=>{
        btn.addEventListener('click', function(){
            openLoginPop.style.display = 'none';
            openSignupPop.style.display = 'none';
            login(); 
        })
    })
    // switch
    document.querySelectorAll('.pop-more .btn-med-plain').forEach(btn=>{
        btn.addEventListener('click', function(){
            if(btn.textContent === '點此登入'){
                openLoginPop.style.display = 'none';
                openSignupPop.style.display = 'block';                            
            }else{
                openLoginPop.style.display = 'block';
                openSignupPop.style.display = 'none'; 
                login();                 
            }
        })
    })
}
