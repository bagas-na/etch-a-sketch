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

    gridSizeDisplay.forEach((display) => {
        display.innerHTML = gridLength;
    });
}

function boxProperty (box) {
    box.classList.add('box');
    box.setAttribute('data-box', `${gridContainer.childElementCount+1}`);
    box.setAttribute('draggable', false);
    box.addEventListener('mouseover', etch, {passive: true})

    if(showGrid) {
        box.style.setProperty('border', '1px solid rgba(0, 0, 0, 10%)');
    }
}

function setBoxBorder(gridLength) {
    gridBoxes = document.querySelectorAll('.grid > .box');
    gridBoxes.forEach((box) => {
        box.className = 'box';
        boxNumber = box.getAttribute('data-box');
        if(+boxNumber === 1) {
            box.classList.add('top-left');}
        else if(+boxNumber === +gridLength) {
            box.classList.add('top-right');}
        else if(+boxNumber === (gridLength-1)*gridLength+1) {
            box.classList.add('bottom-left');}
        else if(+boxNumber === gridLength*gridLength) {
            box.classList.add('bottom-right');}
    })
}

function etch(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    } else if (isEraser) {
        e.target.style.backgroundColor = "var(--etch-background)";
    } else if (isRainbow && !isShading) {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } 
    // else if (isShading) {
    //     const currentColor = e.target.style.backgroundColor;
    //     const currentRGB = currentColor.replace(/[^\d,]/g, '').split(',')
        
    //     if 
    //     const currentHSL = []
    // } 
    else {
        e.target.style.backgroundColor = colorSelector.value;
    }
}

function deleteGrid() {
    resizeGridTo(0);
}

function createGrid(gridLength) {
    deleteGrid();
    resizeGridTo(gridLength);
}

const defaultGridSize = 12;
const sizeSelector = document.querySelector('.size-selector');
const colorSelector = document.querySelector('.color-picker');
const gridContainer = document.getElementById('etch-a-sketch');
const CSSVariable = document.querySelector(':root');
const gridSizeDisplay = document.querySelectorAll('.size-display');
const gridBtn = document.getElementById('grid-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const eraserBtn = document.getElementById('eraser-btn');
const shadingBtn = document.getElementById('shading-btn');
const clearBtn = document.getElementById('clear-btn');
const resetBtn = document.getElementById('reset-btn');

let gridBoxes = document.querySelectorAll('.grid > .box');
let etchColor = colorSelector.value;
let mouseDown = false;
let showGrid = true;
let isRainbow = false;
let isEraser = false;
let isShading = false;


document.addEventListener('mousedown', () => {mouseDown = true;})
document.addEventListener('mouseup', () => {mouseDown = false;})

colorSelector.addEventListener('input', function (e) {
    colorSelector.value = e.target.value;
    // CSSVariable.style.setProperty('--etch-color', etchColor);
}, {passive: true});

gridBtn.addEventListener('click', function(e) {
    if(!showGrid) {
        showGrid = true;
    } else {
        showGrid = false;
    };

    if(showGrid) {
        e.target.classList.add('btn-toggle');
        gridBoxes.forEach((box) => {
            box.style.setProperty('border', '1px solid rgba(0, 0, 0, 10%)');
        })
    } else {
        e.target.classList.remove('btn-toggle');
        gridBoxes.forEach((box) => {
            box.style.setProperty('border', '0px');
        })
    };
})

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


// shadingBtn.addEventListener('click', function(e) {
//     if(!isShading) {
//         isShading = true;
//     } else {
//         isShading = false;
//     };

//     if(isShading) {
//         e.target.classList.add('btn-toggle');
//     } else {
//         e.target.classList.remove('btn-toggle');
//     };
// })


sizeSelector.addEventListener('input', function (e) {
    gridSize = e.target.value;
    resizeGridTo(gridSize)

}, {passive: true});

clearBtn.addEventListener('mousedown', function(e) {
    gridSize = sizeSelector.value;
    deleteGrid();
    createGrid(gridSize);
}, {passive: true});

resetBtn.addEventListener('mousedown', function(e) {
    sizeSelector.value = defaultGridSize;
    gridSize = sizeSelector.value;
    deleteGrid();
    createGrid(gridSize);
}, {passive: true});

let gridSize = defaultGridSize;
createGrid(gridSize);