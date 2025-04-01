import { skeletonAttractions, skeletonMetroChip } from "./components/Skeleton.js";
import { renderHeaderAndFooter } from "./components/HeaderAndFooter.js";
import { getAttractions, searchMetro, getMetro, handleScroll } from "./feature/ScriptIndex.js";
import { getAttractionDetails } from "./feature/ScriptAttraction.js";
// import { login } from "./components/LoginAndSignup.js";
import { checkTokenValid } from "./components/CheckTokenValid.js";

document.addEventListener('DOMContentLoaded',async () => {
    const userData = await checkTokenValid();
    if (userData){
        renderHeaderAndFooter(true);
    }else{
        renderHeaderAndFooter(false);
        // login();
    }
    const path = window.location.pathname; 
    if (path === "/"){
        skeletonMetroChip();
        skeletonAttractions();
        await getAttractions();
        await getMetro();
        window.addEventListener('scroll', handleScroll);
        searchMetro();
    }

    const attractionPageMatch = path.match(/^\/attraction\/(\d+)$/);
    if (attractionPageMatch) {
        // renderHeaderAndFooter();
        const id = attractionPageMatch[1]; 
        console.log(`Attraction ID: ${id}`); 
        await getAttractionDetails(id);
    }


});