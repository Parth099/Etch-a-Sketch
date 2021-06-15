var boxWdth = 700;
var numBox = 16;
var erasor = 0;
var rainbow = 0;
var drawMode = 0;
var colorMain = "#000";

function getColor(){
    return (rainbow) ? "#"+Math.floor(Math.random()*16777215).toString(16): colorMain;
}
function getBoxSz(flag = 1){
    if(flag = 1){
        numBox = prompt("Enter a box size, max: 100", 20);
    }
    while(numBox < 0 || numBox > 100){
        numBox = prompt("Enter a box size, MAX: 100", 20);
        console.log(numBox)
    }
    numBox = numBox ?? 20;
}

function DynamicPageCalc(numBox){
    let root = document.documentElement;
    root.style.setProperty("--sz", `${boxWdth}px`)
    root.style.setProperty("--bks", `${numBox}`)
    root.style.setProperty("--bksz", `${boxWdth / numBox}px`)
}

function pushBoxes(main){
    let box = document.createElement("div")
    box.classList.toggle("grid-ele")

    main = document.querySelector(".grid-basis");
    DynamicPageCalc(numBox)

    let clone;
    for(let i = 0; i < numBox * numBox; i++){
        clone = box.cloneNode(true)
        clone.style['background-color'] = 'white';
        clone.setAttribute("draggable", "false");
        //listener

        clone.addEventListener("mousedown", function(e){
            drawMode ^= 1;
            console.log("Engaged", drawMode);
        });

        clone.addEventListener('mouseover', function(e){
            if (!(e.target.classList.contains("colored")) && drawMode && !erasor){
                console.log("hit")
                e.target.style['background-color'] = getColor()
                e.target.classList.add("colored");
            }
            else if(erasor && drawMode){
                console.log("Erasing");
                e.target.style['background-color'] = "#fff"
                e.target.classList.remove("colored");
            }
        })

        main.appendChild(clone)
    }
}
function resetFreeVars(){
    erasor = 0;
    rainbow = 0;
}
function reset(){
    resetFreeVars()
    let gridLst = document.querySelectorAll(".grid-ele")
    gridLst.forEach((gl) => {gl.remove()})
    getBoxSz();
    pushBoxes()
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