boxWdth = 700
numBox = 16;
erasor = 0;
rainbow = 0;
colorMain = "#000";

function getcolor(){
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

function pushBoxes(){
    let main = document.querySelector(".grid-basis")
    let box = document.createElement("div")
    box.classList.toggle("grid-ele")

    DynamicPageCalc(numBox)

    let clone;
    for(let i = 0; i < numBox * numBox; i++){
        clone = box.cloneNode(true)
        clone.style['background-color'] = 'white'

        //listener
        clone.addEventListener('mousedown', function(e){
            if (!(e.target.classList.contains("colored"))){
                e.target.style['background-color'] = getcolor()
                e.target.classList.add("colored");
            }
            if(erasor){
                e.target.style['background-color'] = "#fff"
                e.target.classList.remove("colored");
            }
        })

        main.appendChild(clone)
    }
}
function reset(){
    erasor = 0;
    rainbow = 0;
    let gridLst = document.querySelectorAll(".grid-ele")
    gridLst.forEach((gl) => {gl.remove()})
    getBoxSz();
    pushBoxes()
}

function erase(){
    erasor = 1;
    rainbow = 0;
}
function rainbowMode(){
    erasor = 0
    rainbow = 1;
}
var cpp = document.getElementById("cpp")
cpp.addEventListener("change", function(e){
    colorMain = e.target.value;
    rainbow = 0;
});

pushBoxes()
