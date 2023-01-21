function resizeGridTo(gridLength) {
    let box = "box";

    CSSVariable.style.setProperty('--grid-length', gridLength);

    while (gridContainer.childElementCount > gridLength*gridLength) {
        gridContainer.removeChild(gridContainer.lastChild);
      }

    while (gridContainer.childElementCount < gridLength*gridLength){
        box = document.createElement("div");
        boxProperty(box);
        gridContainer.appendChild(box);
    }
    setBoxBorder(gridLength);
}

function boxProperty (box) {
    box.classList.add('box');
    box.setAttribute('data-box', `${gridContainer.childElementCount+1}`)
    // box.setAttribute("draggable", false)

    box.addEventListener('mouseover', etch, {passive: true})
    gridContainer.appendChild(box);
}

function setBoxBorder(gridLength) {
    gridBoxes = document.querySelectorAll('.grid > .box');
    gridBoxes.forEach((box) => {
        box.className = 'box';
        boxNumber = box.getAttribute('data-box');
        if(+boxNumber === 1) {
            console.log(`Box Number: ${boxNumber}`);
            box.classList.add('top-left');}
        else if(+boxNumber === +gridLength) {
            console.log(`Box Number: ${boxNumber}`);
            box.classList.add('top-right');}
        else if(+boxNumber === (gridLength-1)*gridLength+1) {
            console.log(`Box Number: ${boxNumber}`);
            box.classList.add('bottom-left');}
        else if(+boxNumber === gridLength*gridLength) {
            console.log(`Box Number: ${boxNumber}`);
            box.classList.add('bottom-right');}
    })
}

function etch(e) {
    if (e.type === 'mouseover' && mouseDown === true) {
        e.target.style.backgroundColor = "black";}
}

function deleteGrid() {
    resizeGridTo(0);
}

function createGrid(gridLength) {
    deleteGrid();
    resizeGridTo(gridLength);
}

const defaultGridSize = 12;
let mouseDown = false;
let isRainbow = false;
let isEraser = false;
let isShading = false;

const sizeSelector = document.querySelector('.size-selector');
const gridContainer = document.getElementById('etch-a-sketch');
const CSSVariable = document.querySelector(':root');
const rainbowBtn = document.getElementById('rainbow-btn')
const eraserBtn = document.getElementById('eraser-btn')
const shadingBtn = document.getElementById('shading-btn')
const clearBtn = document.getElementById('clear-btn');
const resetBtn = document.getElementById('reset-btn');
let gridBoxes = document.querySelectorAll('.grid > .box');

document.addEventListener('mousedown', () => {mouseDown = true;})
document.addEventListener('mouseup', () => {mouseDown = false;})

rainbowBtn.addEventListener('click', function(e) {
    if(!isRainbow) {
        isRainbow = true;
    } else {
        isRainbow = false;
    };

    if(isRainbow) {
        e.target.classList.add('btn-toggle');
    } else {
        e.target.classList.remove('btn-toggle');
    };
})

eraserBtn.addEventListener('click', function(e) {
    if(!isEraser) {
        isEraser = true;
    } else {
        isEraser = false;
    };

    if(isEraser) {
        e.target.classList.add('btn-toggle');
    } else {
        e.target.classList.remove('btn-toggle');
    };
})


shadingBtn.addEventListener('click', function(e) {
    if(!isShading) {
        isShading = true;
    } else {
        isShading = false;
    };

    if(isShading) {
        e.target.classList.add('btn-toggle');
    } else {
        e.target.classList.remove('btn-toggle');
    };
})


sizeSelector.addEventListener('input', function (e) {
    console.log(e.target.value);
    gridSize = e.target.value;
    resizeGridTo(gridSize)

}, {passive: true});

clearBtn.addEventListener('mousedown', function(e) {
    gridSize = sizeSelector.value;
    deleteGrid();
    createGrid(gridSize);
}, {passive: true});

resetBtn.addEventListener('mousedown', function(e) {
    console.log(sizeSelector.value);
    sizeSelector.value = defaultGridSize;
    gridSize = sizeSelector.value;
    deleteGrid();
    createGrid(gridSize);
}, {passive: true});

let gridSize = defaultGridSize;
createGrid(gridSize);