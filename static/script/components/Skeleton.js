export function skeletonAttractions(){
    const attractionList = document.querySelector("#attraction ol");
    for (let i=0 ; i<=8 ; i++){
        const attractionItem = document.querySelector("#attraction ol li");        
        attractionList.appendChild(attractionItem.cloneNode(true));
    }
}


export function skeletonMetroChip(){
    console.log('running')
    const metroChipList = document.querySelector("#carousel-container ol");
    for (let i=0 ; i<=6 ; i++){
        const metroChipItem = document.querySelector("#carousel-container ol li");        
        metroChipList.appendChild(metroChipItem.cloneNode(true));
    }
}