boxWdth = 700
numBox = 16

function getBoxSz(){
    numBox = prompt("Enter a box size, max: 100", 20);
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
        clone.addEventListener('mouseover', function(e){
            e.target.style['background-color'] = "#000";
            e.target.classList.toggle("colored");
        }, {once: true})

        main.appendChild(clone)
    }
}
function reset(){

    console.log("called")
    let gridLst = document.querySelectorAll(".grid-ele")
    gridLst.forEach((gl) => {gl.remove()})
    getBoxSz();
    pushBoxes()
}

pushBoxes()
