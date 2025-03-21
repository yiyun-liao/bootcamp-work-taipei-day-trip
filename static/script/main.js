import { handleScroll } from "./components/AttractionsList.js";
import { getAttractions, searchMetro, getMetro } from "./feature/ScriptIndex.js";
import { skeletonAttractions, skeletonMetroChip } from "./components/Skeleton.js";

document.addEventListener('DOMContentLoaded', () => {
    skeletonMetroChip();
    skeletonAttractions();
    getAttractions();
    getMetro();
    window.addEventListener('scroll', handleScroll);
    searchMetro();
});