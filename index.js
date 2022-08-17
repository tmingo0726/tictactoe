const state = {};

const resetState = () => {
    state.board = ['','','','','','','','',''];
    
}

const gameArea = document.getElementById('gameBoard');
const boardEntries = document.getElementsByClassName('letterBox');
const boardArr = [...boardEntries];
const startButton = document.getElementById('startBtn');
let playerOne = "";
let playerTwo = "";
let whoseTurn = "";


const savePlayer1 = () => {
    
    let player = document.getElementById("player1Value");
    let player2 = document.getElementById("player2Value");
    player.disabled="disabled";
    playerOne = document.getElementById("player1Value").value;
    player2.disabled = false;
    whoseTurn = playerOne;
}

const savePlayer2 = () => {
    
    let player = document.getElementById("player2Value");
    player.disabled="disabled";
    playerTwo = document.getElementById("player2Value").value;
    startButton.disabled = false;
}

const resetGame = () => {

    console.log("Inside resetGame");
    boardArr.forEach(boardArr => {
        boardArr.value = "-";
    });
    whoseTurn = playerOne;

}

const areSame = (val) => {

    if (whoseTurn === playerOne)
        return val === 'O';
    else
        return val === 'X';

}
    
const checkDiagonals = () => {

    let tempArr = [];
        
    for (let i = 0; i < 9; i += 4) {
        tempArr.push(boardArr[i].value);
    }

    if (tempArr.every(areSame))
        return true;
    
    tempArr.length = 0;
    for (let i = 2; i < 7; i += 2) {
        tempArr.push(boardArr[i].value);
    }
    
    if (tempArr.every(areSame))
        return true;
    
    return false;

}

const checkColumns = () => {

    let tempArr = [];
        
    for (let i = 0; i < 7; i += 3) {
        tempArr.push(boardArr[i].value);
    }

    if (tempArr.every(areSame))
        return true;
    
    tempArr.length = 0;
    for (let i = 4; i < 8; i += 3) {
        tempArr.push(boardArr[i].value);
    }
    
    if (tempArr.every(areSame))
        return true;

    tempArr.length = 0;
    for (let i = 2; i < 9; i += 3) {
        tempArr.push(boardArr[i].value);
    }

    if (tempArr.every(areSame))
        return true;

    return false;

}

const checkRows = () => {

    let tempArr = [];
        
    for (let i = 0; i < 3; i++) {
        tempArr.push(boardArr[i].value);
    }

    if (tempArr.every(areSame))
        return true;

    tempArr.length = 0;
    for (let i = 3; i < 6; i++) {
        tempArr.push(boardArr[i].value);
    }
    
    if (tempArr.every(areSame))
        return true;

    tempArr.length = 0;
    for (let i = 6; i < 9; i++) {
        tempArr.push(boardArr[i].value);
    }

    if (tempArr.every(areSame))
        return true;   
    
    return false;

}

const renderCurrentPlayer = () => {

    let text = `It is now ${whoseTurn}'s turn to play`;
    document.getElementById('currentPlayerLabel').innerText = text;

}

const checkForWinner = () => {

    if (checkRows()) {
        console.log("Rows: We have a winner :", whoseTurn);
        return true;
    };

    if (checkColumns()) {
        console.log("Columns We have a winner :", whoseTurn);
        return true;
    };

    if (checkDiagonals()){
        console.log("Diagonals We have a winner :", whoseTurn);
        return true;
    };

    return false;
}

const startGame = () => {
    renderCurrentPlayer();

}
gameArea.addEventListener('click', function(clickEvent) {
    
    //Let's find out whose turn it is
    if (whoseTurn === playerOne) {
        clickEvent.target.value = 'O';
    } else {
        clickEvent.target.value = 'X';
    }
   
    checkForWinner();
    whoseTurn = whoseTurn === playerTwo ?  playerOne : playerTwo;
    renderCurrentPlayer();
        
});

