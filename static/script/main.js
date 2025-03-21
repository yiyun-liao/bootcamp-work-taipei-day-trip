import { handleScroll } from "./components/AttractionsList.js";
import { getAttractions, searchMetro, getMetro } from "./feature/ScriptIndex.js";

document.addEventListener('DOMContentLoaded', () => {
    getAttractions();
    getMetro();
    window.addEventListener('scroll', handleScroll);
    searchMetro();
});