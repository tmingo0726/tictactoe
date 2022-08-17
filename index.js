const state = {};

const resetState = () => {
    state.board = ['','','','','','','','',''];
}

const gameArea = document.getElementById('gameBoard');
const boardEntries = document.getElementsByClassName('letterBox');
const boardArr = [...boardEntries];
let playerOne = "";
let playerTwo = "";
let whoseTurn = "";


const savePlayer1 = () => {
    
    let player = document.getElementById("player1Value");
    document.getElementById("player1Label").innerHTML = player.value + " " + "O";
    player.disabled="disabled";
    playerOne = document.getElementById("player1Value").value;
    whoseTurn = playerOne;
}

const savePlayer2 = () => {
    
    let player = document.getElementById("player2Value");
    document.getElementById("player2Label").innerHTML = player.value + " " + "X";
    player.disabled="disabled";
    playerTwo = document.getElementById("player2Value").value;
}

const resetGame = () => {

    console.log("Inside resetGame");
    boardArr.forEach(boardArr => {
        boardArr.value = "-";
    });
    whoseTurn = playerOne;

}

const areSame = (val) => {

    return val === 'X';

}
    
const checkDiagonals = () => {

    return false;

}

const checkColumns = () => {

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

const checkForWinner = () => {

    if (checkRows()) {
        console.log("Rows: We have a winner");
        return true;
    };

    if (checkColumns()) {
        console.log("Columns We have a winner");
        return true;
    };

    if (checkDiagonals()){
        console.log("Diagonals We have a winner");
        return true;
    };

    return false;
}
gameArea.addEventListener('click', function(clickEvent) {
    
    //console.log("Inside event listener", whoseTurn);
    
    //Let's find out whose turn it is
    if (whoseTurn === playerOne) {
        clickEvent.target.value = 'O';
        clickEvent.target.disabled = 'disabled';
        whoseTurn = playerTwo;
    } else {
        clickEvent.target.value = 'X';
        clickEvent.target.disabled = 'disabled';
        whoseTurn = playerOne;
    }
   
    checkForWinner();
});

