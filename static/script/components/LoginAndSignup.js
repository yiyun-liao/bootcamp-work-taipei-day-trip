export function login(){
    const loginMail = document.getElementById('login_mail');
    const loginPassword = document.getElementById('login_password');
    // console.log('clear all')
    loginMail.value = '';
    loginPassword.value = '';
    document.getElementById('login_submit').addEventListener('click',(event)=>{
        event.preventDefault();
        console.log(loginMail.value, loginPassword.value)
        if (!loginMail.value.includes('@')){
            (alert('請輸入有效的電子信箱'))
            loginMail.value = '';
            return   
        };
        if (loginPassword.value.length < 8 || loginPassword.value.length > 16){
            (alert('密碼至少 8 碼且少於 16 碼'))
            loginPassword.value = '';
            return             
        };
        console.log('process done');
        fetchLogin(loginMail.value, loginPassword.value);
    });
}


async function fetchLogin(mail, password){
    try{
        const response = await fetch("/api/user/auth")
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        return await response.json();
    } catch(error){
        console.error('Error fetching data:', error);
    }
}

// export function signup(event){
//     event.preventDefault();

//     const name = document.getElementById('signup_name');
//     const username = document.getElementById('signup_username');
//     const password = document.getElementById('signup_password');
//     const submit = document.getElementById('signup_submit');

//     const nameError = document.getElementById('signup_name_error');
//     const usernameError = document.getElementById('signup_username_error');
//     const passwordError = document.getElementById('signup_password_error');  
    
//     const inputRule = /^[A-Za-z0-9]{2,}$/;
//     function validateSignupInputs(){
//         nameError.textContent= name.value === "" ? "姓名不得空白" 
//             : (!inputRule.test(name.value) ? "姓名只能包含英數字，且至少 2 個字元" : "");
//         usernameError.textContent= username.value === "" ? "帳號不得空白" 
//             : (!inputRule.test(username.value) ? "帳號只能包含英數字，且至少 2 個字元" : "");
//         passwordError.textContent= password.value === "" ? "密碼不得空白" 
//             : (!inputRule.test(password.value) ? "帳號只能包含英數字，且至少 2 個字元" : "");
//         submit.disabled = !(nameError.textContent === "" && usernameError.textContent === "" && passwordError.textContent === "");
//     }

//     document.getElementById('signup_form').addEventListener('input', validateSignupInputs());
// }