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


//Store off the whoseTurn variable as we enter the first player's name.
//Return focus to player 2.
const savePlayer1 = () => {
    
    playerOne = document.getElementById("player1Value").value;
    whoseTurn = playerOne;
    player2.disabled = false;
    player2.setSelectionRange(0, 0);
    player2.focus();
}

const savePlayer2 = () => {
    
    playerTwo = document.getElementById("player2Value").value;
    if (playerTwo !== "")
        startButton.disabled = false;
}

//Either used to reset an incomplete game or start a new one with the same players.
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
    let indexArr = [];
    
    result = arr.every(areSame);
    
    if (result) {
        switch(str) {

            case "r1":
                indexArr = [0,1,2];
                break;
            case "r2":
                indexArr = [3,4,5];
                break;
            case "r3":
                indexArr = [6,7,8];
                break;
            case "c1":
                indexArr = [0,3,6];
                break;
            case "c2":
                indexArr = [1,4,7];
                break;
            case "c3":
                indexArr = [2,5,8];
                break;
            case "d1":
                indexArr = [0,4,8];
                break;
            case "d2":
                indexArr = [2,4,6];
                break;    
            default:
                break;
        } //end switch
        for (i = 0; i < 3; i++) {
            boardArr[indexArr[i]].style.backgroundColor = "yellow";
        } //end for
    } //end result
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
    let emptyArr = [];
    let length = 0;
    let index = -1;
    
    for (i = 0; i < boardArr.length; i++) {
        if (boardArr[i].innerHTML === 'O') {
            tempCheck.push(i);
        } else if (boardArr[i].innerHTML === "") {
            emptyArr.push(i);
        }
    }

    length = tempCheck.length;
    if (length === 1) {
        if (tempCheck.includes(4)) {
            boardArr[0].innerHTML = 'X';
        } else {
            boardArr[4].innerHTML = "X";
        }
        return;
    } 

    for (i = 0; i < emptyArr.length; i++) {
        switch (emptyArr[i]) {
            case 7 :
                if ((tempCheck.includes(1) && tempCheck.includes(4)) ||
                    (tempCheck.includes(6) && tempCheck.includes(8)))
                        index = 7;
                break;
            case 2 :
                if ((tempCheck.includes(5) && tempCheck.includes(8)) ||
                    (tempCheck.includes(4) && tempCheck.includes(6)))
                        index = 2;
                break;
            case 5 :
                if ((tempCheck.includes(2) && tempCheck.includes(8)) ||
                    (tempCheck.includes(3) && tempCheck.includes(4)))
                        index = 5;
                break;
            case 6 :
                console.log("in case 6");
                if ((tempCheck.includes(0) && tempCheck.includes(3)) ||
                    (tempCheck.includes(7) && tempCheck.includes(8)) ||
                    (tempCheck.includes(2) && tempCheck.includes(4)))
                        index = 6;
                break;
            case 3 :
                console.log("in case 3");
                if ((tempCheck.includes(0) && tempCheck.includes(6)) ||
                    (tempCheck.includes(4) && tempCheck.includes(5)))
                        index = 3;
                break;
            case 8 :
                console.log("in case 8");
                if ((tempCheck.includes(0) && tempCheck.includes(4)) ||
                    (tempCheck.includes(6) && tempCheck.includes(7)) ||
                    (tempCheck.includes(2) && tempCheck.includes(5)))
                        index = 8;
                break;
            case 1 :
                console.log("in case 1");
                if ((tempCheck.includes(0) && tempCheck.includes(2)) ||
                    (tempCheck.includes(4) && tempCheck.includes(7)))
                        index = 1;
                break;

            default :
                console.log("No case for empty array index ", emptyArr[i]);
                break;
        } //end switch emptyArr[i]
    }
    
    //After all of the checks there are still situations where any square is safe to use 
    //so in that case just get the first empty one.
    if (index === -1) {
        for (i = 0; i < boardArr.length; i++) {
            if (boardArr[i].innerHTML === "") {
                index = i;
                break;
            }
        }
    }
    boardArr[index].innerHTML = 'X';
    boardArr[index].style.pointerEvents = "none";
}

const findSquare = () => {

    checkForBestSquare();
    
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
                setTimeout(findSquare, 500);
           }
        }
    }
});

disableAllInputs();
startButton.disabled = true;
resetButton.disabled = true;
