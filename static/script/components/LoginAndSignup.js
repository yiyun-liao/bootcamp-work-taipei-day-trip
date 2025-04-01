export function login(){
    const loginMail = document.getElementById('login_mail');
    const loginPassword = document.getElementById('login_password');
    console.log('login clear all')
    loginMail.value = '';
    loginPassword.value = '';
    document.getElementById('login-form').addEventListener('submit',(event)=>{
        event.preventDefault();
        console.log(loginMail.value, loginPassword.value)
        if (!loginMail.value.includes('@')){
            (alert('請輸入有效的電子信箱'))
            loginMail.value = '';
        } else if (loginPassword.value.length < 8 || loginPassword.value.length > 16){
            (alert('密碼至少 8 碼且少於 16 碼'))
            loginPassword.value = '';
        } else {
            const revertLoginData = {
                email: escapeHTML(loginMail.value), 
                password: escapeHTML(loginPassword.value)
            }
            fetchLogin(revertLoginData);
            console.log('process done', revertLoginData);
            loginMail.value = '';
            loginPassword.value = '';
        }
    });
}


async function fetchLogin(LoginData){
    const errorText = document.querySelector('.pop-error-hint');

    try{
        const response = await fetch("/api/user/auth",{
            method: "PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(LoginData)
        })
        if (response.status === 400){
            errorText.style.display = 'block';
            errorText.textContent = '登入失敗，帳號或密碼錯誤';
        } else if (response.status === 500){
            errorText.style.display = 'block';
            errorText.textContent = '系統連線問題，請稍後再試';
        } else if (response.status === 200){
            errorText.style.display = 'block';
            errorText.textContent = '登入成功';
            errorText.style.color = 'var(--color-cyan-70)';
            const data = await response.json();
            console.log(data.token)
            if (data.token){
                localStorage.setItem("token", data.token);
                console.log("登入成功，Token: ", data.token);
                location.reload();
            } else {
                console.log("登入失敗");
            }
        }

    } catch(error){
        console.error('Error fetching data:', error);
    }
}

// signup =============================
export function signup(){
    const signupUsername = document.getElementById('signup_username');
    const signupMail = document.getElementById('signup_mail');
    const signupPassword = document.getElementById('signup_password');
    signupUsername.value = '';
    signupMail.value = '';
    signupPassword.value = '';
    console.log('signup clear all')

    document.getElementById('signup-form').addEventListener('submit',(event)=>{
        event.preventDefault();

        console.log(signupUsername.value, signupMail.value, signupPassword.value)

        if (!signupUsername.value){
            (alert('請輸入有效的用戶名稱'))
            signupUsername.value = '';
            return            
        }else if (!signupMail.value.includes('@')){
            (alert('請輸入有效的電子信箱'))
            signupMail.value = '';
            return
        } else if (signupPassword.value.length < 8 || signupPassword.value.length > 16){
            (alert('密碼至少 8 碼且少於 16 碼'))
            signupPassword.value = '';
        } else {
            const revertSignupData = {
                name: escapeHTML(signupUsername.value), 
                email: escapeHTML(signupMail.value), 
                password: escapeHTML(signupPassword.value)
            }

            console.log('process done', revertSignupData);
            fetchSignup(revertSignupData);

            signupUsername.value = '';
            signupMail.value = '';
            signupPassword.value = '';
        }
    });
}

function escapeHTML(input) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\//g, "&#x2F;");
}


async function fetchSignup(signupData){
    const errorText = document.querySelector('.pop-error-hint');
    console.log(signupData)
    // try{
    //     const response = await fetch("/api/user",{
    //         method: "PUT",
    //         headers:{"Content-Type": "application/json"},
    //         body: JSON.stringify(signupData)
    //     })
    //     if (response.status === 400){
    //         errorText.style.display = 'block';
    //         errorText.textContent = '登入失敗，帳號或密碼錯誤';
    //     } else if (response.status === 500){
    //         errorText.style.display = 'block';
    //         errorText.textContent = '系統連線問題，請稍後再試';
    //     } else if (response.status === 200){
    //         errorText.style.display = 'block';
    //         errorText.textContent = '登入成功';
    //         errorText.style.color = 'var(--color-cyan-70)';
    //         const data = await response.json();
    //         console.log(data.token)
    //         if (data.token){
    //             localStorage.setItem("token", data.token)
    //             console.log("登入成功，Token: ", data.token);
    //             location.reload();
    //         } else {
    //             console.log("登入失敗");
    //         }
    //     }

    // } catch(error){
    //     console.error('Error fetching data:', error);
    // }
}

// logout =============================
export function logout(){
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        location.reload();
    })
}