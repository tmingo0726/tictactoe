const gameArea = document.getElementById('gameBoard');
const boardEntries = document.getElementsByClassName('letterBox');
const boardArr = [...boardEntries];
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const player1 = document.getElementById("player1Value");
const player2 = document.getElementById("player2Value");
let currentPlayer = document.getElementById("currentPlayer");
let currentPlayerLabel = document.getElementById("currentPlayerLabel");
let playerOne = "";
let playerTwo = "";

let whoseTurn = "";


const savePlayer1 = () => {
    
    playerOne = document.getElementById("player1Value").value;
    whoseTurn = playerOne;
    player2.disabled = false;
}

const savePlayer2 = () => {
    
    playerTwo = document.getElementById("player2Value").value;
    if (playerTwo !== "")
        startButton.disabled = false;
}

const resetGame = () => {

    boardArr.forEach(boardArr => {
        boardArr.style.backgroundColor = "blue";
        boardArr.innerHTML = "";
    });

    //Rendering the player here will allow the losing person a turn at going first. 
    //However, if we are playing the Computer then the human goes first ALL of the time.
    if (playerTwo === "Computer") {
        whoseTurn = playerTwo;
    }
    renderCurrentPlayer();
    enableAllInputs();

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
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("d1", tempArr)) return true;

    tempArr.length = 0;
    for (let i = 2; i < 7; i += 2) {
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("d2", tempArr)) return true;
    
    return false;

}

const checkColumns = () => {

    let tempArr = [];
        
    for (let i = 0; i < 7; i += 3) {
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("c1", tempArr)) return true;

    tempArr.length = 0;
    for (let i = 1; i < 8; i += 3) {
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("c2", tempArr)) return true;
    
    tempArr.length = 0;
    for (let i = 2; i < 9; i += 3) {
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("c3", tempArr)) return true;
    
    return false;

}

const checkIfSame = (str, arr) => {

    let result = false;
    
    result = arr.every(areSame);
    
    if (result) {
        switch(str) {

            case "r1":
                boardArr[0].style.backgroundColor = "red";
                boardArr[1].style.backgroundColor = "red";
                boardArr[2].style.backgroundColor = "red";
                break;
            case "r2":
                boardArr[3].style.backgroundColor = "red";
                boardArr[4].style.backgroundColor = "red";
                boardArr[5].style.backgroundColor = "red";
                break;
            case "r3":
                boardArr[6].style.backgroundColor = "red";
                boardArr[7].style.backgroundColor = "red";
                boardArr[8].style.backgroundColor = "red";
                break;
            case "c1":
                boardArr[0].style.backgroundColor = "red";
                boardArr[3].style.backgroundColor = "red";
                boardArr[6].style.backgroundColor = "red";
                break;
            case "c2":
                boardArr[1].style.backgroundColor = "red";
                boardArr[4].style.backgroundColor = "red";
                boardArr[7].style.backgroundColor = "red";
                break;
            case "c3":
                boardArr[2].style.backgroundColor = "red";
                boardArr[5].style.backgroundColor = "red";
                boardArr[8].style.backgroundColor = "red";
                break;
            case "d1":
                boardArr[0].style.backgroundColor = "red";
                boardArr[4].style.backgroundColor = "red";
                boardArr[8].style.backgroundColor = "red";
                break;
            case "d2":
                boardArr[2].style.backgroundColor = "red";
                boardArr[4].style.backgroundColor = "red";
                boardArr[6].style.backgroundColor = "red";
                break;    
            default:
                break;
        }
    }
    return result;
}

const checkRows = () => {

    let tempArr = [];
        
    for (let i = 0; i < 3; i++) {
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("r1", tempArr)) return true;
    
    tempArr.length = 0;
    for (let i = 3; i < 6; i++) {
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("r2", tempArr)) return true;
    
    tempArr.length = 0;
    for (let i = 6; i < 9; i++) {
        tempArr.push(boardArr[i].innerHTML);
    }
    if (checkIfSame("r3", tempArr)) return true;

    return false;

}

const renderCurrentPlayer = () => {

    whoseTurn = whoseTurn === playerTwo ?  playerOne : playerTwo;
    let text = `It is now ${whoseTurn}'s turn to play`;
    document.getElementById('currentPlayerLabel').innerText = text;

}

const disableAllInputs = () => {

    boardArr.forEach(boardArr => {
        boardArr.style.pointerEvents = "none";
    });

}

const checkForDraw = () => {

    for (let i = 0; i < boardArr.length; i++) {
        //If at least one square is still empty you can't have a draw
        if (boardArr[i].innerHTML === "") return false;
    }
    //No empty squares and no winners...
    return true;
}

const enableAllInputs = () => {

    boardArr.forEach(boardArr => {
        boardArr.style.pointerEvents = "auto";
    });

}
const checkForWinner = () => {

    if (checkRows() || checkColumns() || checkDiagonals()) {
        document.getElementById('currentPlayerLabel').innerText = `${whoseTurn} is the WINNER!!!`;
        return true;
    } else {
        if (checkForDraw()) {
            document.getElementById('currentPlayerLabel').innerText = `We have a DRAW!!!`;
            return true;
        }
    }

    return false;
}

const computerCheck = () => {

    let checkBox = document.getElementById("computer");

    if (checkBox.checked === true) {
        player2.value = "Computer";
        startButton.disabled = false;
        playerTwo = document.getElementById("player2Value").value;
        player2.disabled = true;
    }
}

const checkForBestSquare = () => {

    let tempCheck = [];
    let length = 0;

    for (i = 0; i < boardArr.length; i++) {
        if (boardArr[i].innerHTML === 'O') {
            tempCheck.push(i);
        }
    }

    //Check against diagonals
    //length = tempCheck.length;
    for (i = 0; i < tempCheck.length; i++) {
        if (boardArr[tempCheck[i]] === 4) {
            if (boardArr[2].innerHTML === "")
        }
        if (boardArr[tempCheck].innerHTML === "") {

        }
    }
}

const findSquare = () => {

    //First let's see if the middle one is taken
    if (boardArr[4].innerHTML === "") {
        boardArr[4].innerHTML = "X";
        boardArr[4].style.pointerEvents = "none";
    } else {
        checkForBestSquare();
    }
    /*
        //Let's just find any empty one for now...
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i].innerHTML === "") {
                boardArr[i].innerHTML = "X";
                boardArr[i].style.pointerEvents = "none";
                break;
            }
        }
    }*/

    //Since the computer pick does not go thru the eventhandler we need to force the checkForWinner call
    if (checkForWinner()) {
        disableAllInputs();
        startButton.disabled = true;
        resetButton.disabled = false;
    } else {
        renderCurrentPlayer();
    }
}

const startGame = () => {

    let text = `It is now ${whoseTurn}'s turn to play`;
    document.getElementById('currentPlayerLabel').innerText = text;
    enableAllInputs();

}
gameArea.addEventListener('click', function(clickEvent) {
    
    //Let's find out whose turn it is
    //Also we need to only process clicks if we are a class of letterBox
    if (clickEvent.target.className === "letterBox") {
        if (whoseTurn === playerOne) {
            clickEvent.target.innerHTML = 'O';
        } else {
            clickEvent.target.innerHTML = 'X';
        }

        //Don't allow input on that square any longer
        clickEvent.target.style.pointerEvents = "none";
                
        if (checkForWinner()) {
            disableAllInputs();
            startButton.disabled = true;
            resetButton.disabled = false;
        } else {
           renderCurrentPlayer();
           if (whoseTurn === "Computer") {
                findSquare();
           }
        }
    }
});

disableAllInputs();
startButton.disabled = true;
resetButton.disabled = true;
