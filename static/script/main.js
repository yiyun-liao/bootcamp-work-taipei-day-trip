import { skeletonAttractions, skeletonMetroChip } from "./components/Skeleton.js";
import { renderHeaderAndFooter } from "./feature/HeaderAndFooter.js";
import { getAttractions, searchMetro, getMetro, handleScroll } from "./feature/ScriptIndex.js";
import { getAttractionDetails } from "./feature/ScriptAttraction.js";
import { checkTokenValid } from "./components/CheckTokenValid.js";
import { getBookingData, bookingPageController } from "./feature/booking.js";

document.addEventListener('DOMContentLoaded',async () => {
    const userData = await checkTokenValid();
    if (userData){
        renderHeaderAndFooter(true);
    }else{
        renderHeaderAndFooter(false);
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
        const id = attractionPageMatch[1]; 
        console.log(`Attraction ID: ${id}`); 
        await getAttractionDetails(id);
    }

    if (path === "/booking"){
        if (userData === null){
            window.location.href = "/";
        }else{
            getBookingData(userData.data.data);
            bookingPageController();
        }
    }
});