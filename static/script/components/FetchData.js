export async function fetchData(url){
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        return await response.json();
    } catch(error){
        console.error('Error fetching data:', error);
    }
}
