let gridValues = [[],[],[]];
let buttonClass = "grid-btns";
let buttons = document.getElementsByClassName(buttonClass);
let lastMove = '';
let statusBar = document.getElementById("status");


let afterMoveHandler = function (event) {
    // it seems that this is a reference copy, any changes to button will be reflected in the DOM
    let button = event.target;
    let buttonText = '';
    let nextMove = '';

    // 'X' has first move
    if (lastMove === '' || lastMove === 'O') {
        buttonText = 'X';
        nextMove = 'O';
    } else if (lastMove === 'X'){
        buttonText = 'O';
        nextMove = 'X';
    }

    button.innerText = buttonText;
    lastMove = buttonText;

    let btnId = button.getAttribute("id");
    let xCord = btnId.split("-")[1];
    let yCord = btnId.split("-")[2];
    // update the grid values
    gridValues[xCord][yCord] = button.innerText;
    let gameOver = checkVictory(gridValues);
    if (gameOver) {
        let msg = `${buttonText} wins!!!`;
        statusBar.innerText = msg;
    } else {
        statusBar.innerText = `${nextMove}'s Move!`
    }
};

function checkVictory(gridValues) {
    console.log("checking victory ...");
    let gameOver = false;

    // check rows
    for (let rowNum = 0; rowNum < 3; rowNum++) {
        let rowValues = row(gridValues, rowNum);

        // the row isn't full yet
        if (rowValues.length < 3){
            console.log(rowValues, rowValues.length);
            continue;
        }

        if (allEqual(rowValues)) {
            console.log("Victory!");
            gameOver = true;
            clearGrid();
            break;
        }
    }

    // check columns
    for (let colNum = 0; colNum < 3; colNum++) {
        let colValues = column(gridValues, colNum);

        // the column isn't full yet
        if (colValues.length < 3){
            console.log(colValues, colValues.length);
            continue;
        }

        if (allEqual(colValues)) {
            console.log("Victory!");
            gameOver = true;
            clearGrid();
            break;
        }
    }

    // check top-left diagonal
    let leftDiagonalValues = topLeftDiagonal(gridValues);

    // the diagonal isn't full yet
    if (leftDiagonalValues.length < 3){
        console.log(leftDiagonalValues, leftDiagonalValues.length);
    }

    if (allEqual(leftDiagonalValues)) {
        console.log("Victory!");
        gameOver = true;
        clearGrid();
    }

    // check top-right diagonal
    let rightDiagonalValues = topRightDiagonal(gridValues);

    // the diagonal isn't full yet
    if (rightDiagonalValues.length < 3){
        console.log(rightDiagonalValues, rightDiagonalValues.length);
    }


    if (allEqual(rightDiagonalValues)) {
        console.log("Victory!");
        gameOver = true;
        clearGrid();
    }

    if (!gameOver) {
        console.log('the game continues ...');
    }

    return gameOver;
}

function allEqual(values) {
    let matchCount = 0;
    let lastValue = '';
    for (let value of values) {
        if (value !== '' && value !== undefined && value === lastValue){
            matchCount++;
        }
        lastValue = value;
    }

    console.log(values, matchCount);
    return (matchCount === values.length - 1);
}

// grid helper functions

// clears the grid e.g after a victory or a restart
function clearGrid() {
    for (let button of buttons){
        button.innerText = '';
    }

    for (let yCord = 0; yCord < 3; yCord++) {
        for (let xCord = 0; xCord < 3; xCord++) {
            gridValues[xCord][yCord] = '';
        }
    }
}

// given the gridValues and a row no. returns all the values in the row
function row(gridValues, rowNum) {
    let rowValues = [];
    for (let xCord = 0; xCord < 3; xCord++) {
        let cellValue = gridValues[xCord][rowNum];
        if (cellValue !== undefined || cellValue !== '') {
            rowValues.push(cellValue);
        }
    }
    return rowValues;
}

// given the gridValues and a column no. returns all the values in the column
function column(gridValues, colNum) {
    let colValues = [];
    for (let yCord = 0; yCord < 3; yCord++) {
        let cellValue = gridValues[colNum][yCord];
        if (cellValue !== undefined || cellValue !== '') {
            colValues.push(cellValue);
        }
    }
    return colValues;
}


// given the gridValues returns all the values in the topLeft diagonal
function topLeftDiagonal(gridValues) {
    let diagnolValues = [];
    for (let cord = 0; cord < 3; cord++) {
        let cellValue = gridValues[cord][cord];
        if (cellValue !== undefined || cellValue !== '') {
            diagnolValues.push(cellValue);
        }
    }
    return diagnolValues;

}

// given the gridValues returns all the values in the top Right diagonal
function topRightDiagonal(gridValues) {
    let diagnolValues = [];
    for (let xCord = 2; xCord >= 0; xCord--) {
        let yCord = 2 - xCord;
        let cellValue = gridValues[xCord][yCord];
        if (cellValue !== undefined || cellValue !== '') {
            diagnolValues.push(cellValue);
        }
    }

    return diagnolValues;
}

// main function
function main() {
    for (let button of buttons){
        button.onclick = afterMoveHandler
    }
    // X has the first move
    statusBar.innerText = "X's Move";
}

main();