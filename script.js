const sizeSelector = document.querySelector('.size-selector');
const gridContainer = document.getElementById('etch-a-sketch');
const CSSVariable = document.querySelector(':root');
const refreshButton = document.getElementById('refresh');
const resetButton = document.getElementById('reset');
const defaultGridSize = 16;
let gridBoxes = document.querySelectorAll('.box');

let mouseDown = false;

document.addEventListener('mousedown', () => {mouseDown = true;})
document.addEventListener('mouseup', () => {mouseDown = false;})

function resizeGridTo(gridLength) {
    CSSVariable.style.setProperty('--grid-length', gridLength);

    while (gridContainer.childElementCount > gridLength*gridLength) {
        gridContainer.removeChild(gridContainer.lastChild);
      }

    let box = "box";
    while (gridContainer.childElementCount < gridLength*gridLength){
        box = document.createElement("div");
        boxProperty(box);
        gridContainer.appendChild(box);
    }
}

function boxProperty (box) {
    box.classList.add('box');
    box.setAttribute('id', `box#${gridContainer.childElementCount+1}`)
    box.setAttribute("draggable", false)

    box.addEventListener('mouseover', etch, {passive: true})
    box.addEventListener('touchstart', etch, {passive: true})
    gridContainer.appendChild(box);
}

function etch(e) {
    if (e.type === 'mouseover' && mouseDown === true) {
        e.target.style.backgroundColor = "black";
    }
}

function deleteGrid() {
    resizeGridTo(0);
}

function createGrid(gridLength) {
    deleteGrid();
    resizeGridTo(gridLength);
}

sizeSelector.addEventListener('input', function (e) {
    console.log(e.target.value);
    gridSize = e.target.value;
    resizeGridTo(gridSize)

}, {passive: true});

refreshButton.addEventListener('mousedown', function(e) {
    gridSize = sizeSelector.value;
    deleteGrid();
    createGrid(gridSize);
}, {passive: true});

resetButton.addEventListener('mousedown', function(e) {
    console.log(sizeSelector.value);
    sizeSelector.value = defaultGridSize;
    gridSize = sizeSelector.value;
    deleteGrid();
    createGrid(gridSize);
}, {passive: true});

let gridSize = defaultGridSize;
createGrid(gridSize);