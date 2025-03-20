export async function fetchData(url){
    try{
        console.log("run api")
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        console.log("fetch 完成", response);
        return await response.json();
    } catch(error){
        console.error('Error fetching data:', error);
    }
}
