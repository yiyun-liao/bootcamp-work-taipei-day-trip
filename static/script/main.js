import { skeletonAttractions, skeletonMetroChip } from "./components/Skeleton.js";
import { renderHeaderAndFooter } from "./components/HeaderAndFooter.js";
import { getAttractions, searchMetro, getMetro, handleScroll } from "./feature/ScriptIndex.js";
import { getAttractionDetails } from "./feature/ScriptAttraction.js";

document.addEventListener('DOMContentLoaded',async () => {
    const path = window.location.pathname; 
    if (path === "/"){
        renderHeaderAndFooter();
        skeletonMetroChip();
        skeletonAttractions();
        await getAttractions();
        await getMetro();
        window.addEventListener('scroll', handleScroll);
        searchMetro();
    }

    const attractionPageMatch = path.match(/^\/attraction\/(\d+)$/);
    if (attractionPageMatch) {
        renderHeaderAndFooter();
        const id = attractionPageMatch[1]; 
        console.log(`Attraction ID: ${id}`); 
        await getAttractionDetails(id);
    }
});