var boxWdth = 700;
var numBox = 16;
var erasor = 0;
var rainbow = 0;
var drawMode = 0;
var grayMode = 0;
var colorMain = "#000";


function getColor(){
    return (rainbow) ? '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0') : colorMain;
}
function getBoxSz(flag = 1){
    if(flag = 1){
        numBox = prompt("Enter a box size, max: 100", 20);
    }
    while(numBox < 0 || numBox > 100){
        numBox = prompt("Enter a box size, MAX: 100", 20);
    }
    numBox = numBox ?? 20;
}

function DynamicPageCalc(numBox){
    let root = document.documentElement;
    root.style.setProperty("--sz", `${boxWdth}px`);
    root.style.setProperty("--bks", `${numBox}`);
    root.style.setProperty("--bksz", `${boxWdth / numBox}px`);
}

function pushBoxes(main){
    let box = document.createElement("div");
    box.classList.toggle("grid-ele");

    main = document.querySelector(".grid-basis");
    DynamicPageCalc(numBox);

    let clone;
    for(let i = 0; i < numBox * numBox; i++){
        clone = box.cloneNode(true);
        clone.style['background-color'] = 'white';
        clone.setAttribute("draggable", "false");
        clone.setAttribute("data-grayscale", "0");
        //listener

        clone.addEventListener("mousedown", function(e){
            drawMode ^= 1;
            pushColor(e);
        });

        clone.addEventListener('mouseover', pushColor);

        main.appendChild(clone)
    }
}
function pushColor(e){
    if(!grayMode){
        if (!(e.target.classList.contains("colored")) && drawMode && !erasor){
            e.target.style['background-color'] = getColor();
            e.target.classList.add("colored");
            e.target.classList.add("written");
        }
        else if(erasor && drawMode){
            e.target.style['background-color'] = "#fff";
            e.target.classList.remove("colored");
        }
    }
    else{
        if(drawMode && !erasor){
            let scale = parseInt(e.target.dataset.grayscale) + 1;
            if(scale - 1 == 0){
                e.target.classList.add("colored");
            }
            if(!e.target.classList.contains("written") && scale < 11){;
                e.target.style['background-color'] = `hsl(0, 0%, ${100 - (scale * 10)}%)`;
                e.target.dataset.grayscale = scale;
            }
        }
    }
}

function resetFreeVars(){
    erasor = 0;
    rainbow = 0;
    grayMode = 0;
}
function reset(def = 1){
    resetFreeVars();
    let gridLst = document.querySelectorAll(".grid-ele")
    gridLst.forEach((gl) => {gl.remove()});
    if(def){
        getBoxSz();
    }
    pushBoxes();
}

function erase(){
    resetFreeVars()
    drawMode = 1;
    erasor = 1;

}
function rainbowMode(){
    resetFreeVars()
    rainbow = 1;
}
function grayScale(){
    resetFreeVars();
    grayMode = 1;
}

function main(){
    var cpp = document.getElementById("cpp")
    cpp.addEventListener("change", function(e){
        resetFreeVars()
        colorMain = e.target.value;
    });
    colorMain = cpp.value;
    pushBoxes()
}

main()