import { handleScroll } from "./components/AttractionsList.js";
import { getAttractions, searchMetro, getMetro } from "./feature/ScriptIndex.js";
import { skeletonAttractions, skeletonMetroChip } from "./components/Skeleton.js";
import { renderHeaderAndFooter } from "./components/HeaderAndFooter.js";

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
    // 檢查是否符合 `/attraction/:id` 這種格式
    const attractionPageMatch = path.match(/^\/attraction\/(\d+)$/);
    if (attractionPageMatch) {
        const id = attractionPageMatch[1]; // 取得 `id`
        renderHeaderAndFooter();
        console.log(`Attraction ID: ${id}`); // 確保 `id` 有正確取得
        // 這裡可以加入載入景點詳細資訊的函式，例如：
        // await getAttractionDetails(id);
    }
});