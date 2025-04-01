export async function checkTokenValid(){
    const token = localStorage.getItem('token');
    const response = await fetch('/api/user/auth',{
        method: 'GET',
        headers:{'Authorization': `Bearer ${token}`},
    });
    const data = await response.json();
    console.log(data)
    if (response.status === 200){
        console.log("用戶資料:", data);
        return {data}
    }else {
        console.log("登入失敗或無效的 token");
        return null;        
    }
}