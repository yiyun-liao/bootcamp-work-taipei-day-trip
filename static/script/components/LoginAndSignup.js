export function login(targetURL){
    const loginMail = document.getElementById('login_mail');
    const loginPassword = document.getElementById('login_password');
    console.log('監聽 login, login clear all')

    if (!loginMail.value.includes('@')){
        alert('請輸入有效的電子信箱');
        loginMail.value = '';
        return
    } else if (loginPassword.value.length < 8 || loginPassword.value.length > 16){
        alert('密碼至少 8 碼且少於 16 碼');
        loginPassword.value = '';
        return
    } else {
        const revertLoginData = {
            email: escapeHTML(loginMail.value), 
            password: escapeHTML(loginPassword.value)
        }

        fetchLogin(revertLoginData, targetURL);

        loginMail.value = '';
        loginPassword.value = '';
    }
}

async function fetchLogin(LoginData, targetURL){
    const errorText = document.getElementById('login-error-hint');

    try{
        const response = await fetch("/api/user/auth",{
            method: "PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(LoginData)
        })
        console.log("fetch...")
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

            if (data.token){
                localStorage.setItem("token", data.token);
                console.log("登入成功");
                window.location.href = targetURL || "/";
            } else {
                console.log("登入失敗");
            }
        }

    } catch(error){
        console.error('Error fetching data:', error);
    }
}

// signup =============================
export function signup(targetURL){
    const signupUsername = document.getElementById('signup_username');
    const signupMail = document.getElementById('signup_mail');
    const signupPassword = document.getElementById('signup_password');
    console.log('監聽, signup clear all')

    if (!signupUsername.value){
        alert('請輸入有效的用戶名稱')
        signupUsername.value = '';
        return            
    }else if (!signupMail.value.includes('@')){
        alert('請輸入有效的電子信箱')
        signupMail.value = '';
        return
    } else if (signupPassword.value.length < 8 || signupPassword.value.length > 16){
        alert('密碼至少 8 碼且少於 16 碼')
        signupPassword.value = '';
    } else {
        const revertSignupData = {
            name: escapeHTML(signupUsername.value), 
            email: escapeHTML(signupMail.value), 
            password: escapeHTML(signupPassword.value)
        }

        fetchSignup(revertSignupData, targetURL);

        signupUsername.value = '';
        signupMail.value = '';
        signupPassword.value = '';
    }
}

async function fetchSignup(signupData, targetURL){
    const errorText = document.getElementById('signup-error-hint');
    try{
        const response = await fetch("/api/user",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(signupData)
        })
        const data = await response.json();
        if (response.status === 400){
            errorText.style.display = 'block';
            errorText.textContent = '註冊失敗，請提供正確資料';
        } else if (response.status === 500){
            errorText.style.display = 'block';
            errorText.textContent = '系統連線問題，請稍後再試';
        } else if (response.status === 200){
            errorText.style.display = 'block';
            errorText.textContent = '註冊成功，登入中...';
            errorText.style.color = 'var(--color-cyan-70)';

            const autoLoginData = {
                email: signupData.email, 
                password: signupData.password
            }
            fetchLogin(autoLoginData, targetURL)
        }

    } catch(error){
        console.error('Error fetching data:', error);
    }
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


// logout =============================
export function logout(){
    localStorage.removeItem('token');
    console.log('sign out')
    location.reload();
}