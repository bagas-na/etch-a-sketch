const lengthSelector = document.querySelector('.grid-size');
const gridContainer = document.getElementById('etch-a-sketch');
const gridLength = document.querySelector(':root');
let gridBoxes = document.querySelectorAll('.box');

function createGrid(gridSize) {
    gridLength.style.setProperty('--grid-length', gridSize);

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



let gridSize = 8;
createGrid(gridSize);