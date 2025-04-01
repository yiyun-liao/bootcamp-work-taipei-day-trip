export async function checkTokenValid(){
    const token = localStorage.getItem('token');
    const response = await fetch('/api/user/auth',{
        method: 'GET',
        headers:{'Authorization': `Bearer ${token}`},
    });
    if (!response.ok){
        return null;
    }
    const data = await response.json();
    
    if (data){
        // console.log('have token')
        return {data}
    }else {
        // console.log("登入失敗或無效的 token");
        return null;        
    }
}