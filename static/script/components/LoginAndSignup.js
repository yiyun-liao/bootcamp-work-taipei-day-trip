export function login(){
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
            }
        })
    })
    
}