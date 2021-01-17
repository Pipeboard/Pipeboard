checkSizeAndUpdateGrid();

document.body.onresize = function() {
    checkSizeAndUpdateGrid();
}

window.addEventListener("resize", checkSizeAndUpdateGrid);

function checkSizeAndUpdateGrid() {
    let iis = document.getElementsByClassName("grid");

    let goodl = 0;
    let foundl = false;

    for (let index = 0; index < iis.length; index++) {
        const i = iis[index];
        
        if(foundl == false) {
            goodl = Math.ceil(i.clientWidth) + "px";
            foundl = true;
        } else {
            i.style["max-width"] = goodl;
        }
    }
}

checkSizeAndUpdateGrid();