const lengthSelector = document.querySelector('.grid-size');
const gridContainer = document.querySelector('.grid');
const gridLength = document.querySelector(':root');

console.log(gridContainer.style.gridTemplateColumns);

let gridSize = 16;
gridLength.style.setProperty('--grid-length', gridSize);

console.log(lengthSelector.value);

createGrid(gridSize);

function createGrid(gridSize) {
    
    const box = new Array(gridSize);
    for(let i=1; i<=gridSize; i++){
        box[i] = new Array(gridSize);
        for(let j=1; j<=gridSize; j++){
            box[i][j] = document.createElement("div");
            box[i][j].classList.add('box');
            box[i][j].setAttribute('id', `box-#${j+(i-1)*gridSize}`)
            gridContainer.appendChild(box[i][j]);
        }
    }    
}

function deleteGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
      }
}


lengthSelector.addEventListener('input', function (e) {
    console.log(e.target.value);
    gridSize = e.target.value;
    deleteGrid();
    createGrid(gridSize);
});

