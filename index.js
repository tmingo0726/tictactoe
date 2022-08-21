const gameArea = document.getElementById('gameBoard');
const boardEntries = document.getElementsByClassName('letterBox');
const boardArr = [...boardEntries];
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const player1 = document.getElementById("player1Value");
const player2 = document.getElementById("player2Value");
let currentPlayer = document.getElementById("currentPlayer");
let currentPlayerLabel = document.getElementById("currentPlayerLabel");
let playerOne = "";
let playerTwo = "";

let whoseTurn = "";

let scoreTally = [
    {
      name: "",
      score: 0,
    },
    {
      name: "",
      score: 0
    },
    {
      name: "Cat",
      score: 0,
    }
]


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

const displayRunningScore = () => {

    document.getElementById("scoreHistory").innerHTML = 
        `${scoreTally[0].name} : ${scoreTally[0].score}   ${scoreTally[1].name}  :  ${scoreTally[1].score}
         ${scoreTally[2].name} : ${scoreTally[2].score}`


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
    enableAllSquares();

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

const disableAllSquares = () => {

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

const enableAllSquares = () => {

    boardArr.forEach(boardArr => {
        boardArr.style.pointerEvents = "auto";
    });

}
const checkForWinner = () => {

    if (checkRows() || checkColumns() || checkDiagonals()) {
        document.getElementById('currentPlayerLabel').innerText = `${whoseTurn} is the WINNER!!!`;
        if (whoseTurn === playerOne) {
            scoreTally[0].score++;
        } else {
            scoreTally[1].score++;
        }
        displayRunningScore();
        return true;
    } else {
        if (checkForDraw()) {
            document.getElementById('currentPlayerLabel').innerText = `We have a DRAW!!!`;
            scoreTally[2].score++;
            displayRunningScore();
            return true;
        }
    }

    return false;
}

const getOpponentSquares = () => {

    let opponentArr = [];
    
    for (i = 0; i < boardArr.length; i++) {
        if (boardArr[i].innerHTML === 'O') {
            opponentArr.push(i);
        }
    }

    return opponentArr;
}

const getComputerSquares = () => {
    
    let computerSquares = [];

    for (i = 0; i < boardArr.length; i++) {
        if (boardArr[i].innerHTML === "X") {
            computerSquares.push(i);
        }
    }

    return computerSquares;

}

const getEmptySquares = () => {

    let emptyArr = [];

    for (i = 0; i < boardArr.length; i++) {
        if (boardArr[i].innerHTML === "") {
            emptyArr.push(i);
        }
    }

    return emptyArr;
}

const computerCheck = () => {

    let checkBox = document.getElementById("computer");

    if (checkBox.checked === true) {
        player2.value = "Computer";
        startButton.disabled = false;
        playerTwo = document.getElementById("player2Value").value;
        player2.disabled = true;
    } else {
        startButton.disabled = true;
        player2.disabled = false;
        document.getElementById("player2Value").value = "";
        alert("Make sure you enter a name for Player 2");
        //playerTwo.value  = "";
    }
}

//Instead of focusing on the opponent first, the computer should check to see if it
//has a winning square to occupy. This function serves a dual purpose depending on the
//whichTask variable. 
const checkToWinOrBlock = (emptySquares, computerSquares, whichTask) => {
    let index = -1;

    for (i = 0; i < emptySquares.length; i++) {
        switch (emptySquares[i]) {
            case 0 :
                if ((computerSquares.includes(1) && computerSquares.includes(2)) ||
                    (computerSquares.includes(3) && computerSquares.includes(6)) ||
                    (computerSquares.includes(4) && computerSquares.includes(8)))
                        index = 0;
                break;
            case 7 :
                if ((computerSquares.includes(1) && computerSquares.includes(4)) ||
                    (computerSquares.includes(6) && computerSquares.includes(8)))
                        index = 7;
                break;
            case 2 :
                if ((computerSquares.includes(5) && computerSquares.includes(8)) ||
                    (computerSquares.includes(0) && computerSquares.includes(1)) ||
                    (computerSquares.includes(4) && computerSquares.includes(6)))
                        index = 2;
                break;
            case 5 :
                if ((computerSquares.includes(2) && computerSquares.includes(8)) ||
                    (computerSquares.includes(3) && computerSquares.includes(4)))
                        index = 5;
                break;
            case 6 :
                console.log("in case 6");
                if ((computerSquares.includes(0) && computerSquares.includes(3)) ||
                    (computerSquares.includes(7) && computerSquares.includes(8)) ||
                    (computerSquares.includes(2) && computerSquares.includes(4)))
                        index = 6;
                break;
            case 3 :
                console.log("in case 3");
                if ((computerSquares.includes(0) && computerSquares.includes(6)) ||
                    (computerSquares.includes(4) && computerSquares.includes(5)))
                        index = 3;
                break;
            case 8 :
                console.log("in case 8");
                if ((computerSquares.includes(0) && computerSquares.includes(4)) ||
                    (computerSquares.includes(6) && computerSquares.includes(7)) ||
                    (computerSquares.includes(2) && computerSquares.includes(5)))
                        index = 8;
                break;
            case 1 :
                console.log("in case 1");
                if ((computerSquares.includes(0) && computerSquares.includes(2)) ||
                    (computerSquares.includes(4) && computerSquares.includes(7)))
                        index = 1;
                break;

            default :
                console.log("No case for empty array index ", emptySquares[i]);
                break;
        } //end switch emptySquares[i]
    } //end for
    
    if (index !== -1 && whichTask === "win") {
        boardArr[index].innerHTML = 'X';
        boardArr[index].style.pointerEvents = "none";
    } 
    return index;
}

const checkForOddOddStart = () => {

    let index = -1;

    //We know the opponent has 2 existing picks
    if (boardArr[1].innerHTML === 'O' && boardArr[3].innerHTML === 'O') index = 0;
    else if (boardArr[1].innerHTML === 'O' && boardArr[5].innerHTML === 'O') index = 2;
    else if (boardArr[7].innerHTML === 'O' && boardArr[3].innerHTML === 'O') index = 6;
    else if (boardArr[7].innerHTML === 'O' && boardArr[5].innerHTML === 'O') index = 8;
    else if (boardArr[1].innerHTML === 'O' && boardArr[7].innerHTML === 'O') index = 8;

    return index;
}

const checkForEvenEvenStart = () => {

    //We know the opponent has 2 existing picks and Computer has 1. We will just grab the 
    //first open corner square. This is really testing the opponent beginning with 2 diagonal
    //squares.
    if (boardArr[0].innerHTML === 'O' && boardArr[8].innerHTML === 'O') return 3;
    else if (boardArr[2].innerHTML === 'O' && boardArr[6].innerHTML === 'O') return 5; 
    
}

const grabNonBlockingSquare = (numOfOpponentsSquares) => {

    let index = -1;
    let opponentSquares = [];
    let emptySquares = [];

    opponentSquares = getOpponentSquares();
    emptySquares = getEmptySquares();
    
    //This is an important check early in the game when the opponent only has 2 picks so far. The computer will always
    //choose the middle if it's available early on.
    if (boardArr[4].innerHTML === 'X' && numOfOpponentsSquares === 2) {
        //If the opponent has begun the game with 2 odd squares chosen then we need to account for that. 
        //At this point in the game we are guaranteed to get an strategic available square.
        index = (checkForOddOddStart());
        if (index !== -1) {
            return index;
        } else {
            return checkForEvenEvenStart();
        }
    } 
    
    //Here is where the opponent now has > 2 squares occupied. So now let's block if we need to.
    index = checkToWinOrBlock(emptySquares, opponentSquares, "block");

    //If there were no blocks to choose then we will first grab an available odd square.
    if (index === -1) {
        for (i = 0; i < boardArr.length; i++) {
            if (i % 2) {
                if (boardArr[i].innerHTML === "") {
                    index = i;
                }
            }
        }
    } 
    
    //If there were no odd squares to pick then let's pick a corner
    if (index === -1) {

        if (boardArr[0].innerHTML === "") index = 0;
        else if (boardArr[2].innerHTML === "") index = 2;
        else if (boardArr[6].innerHTML === "") index = 6;
        else if (boardArr[8].innerHTML === "") index = 8;

    }
    return index;
}

const checkForBestSquare = () => {

    let opponentSquares = [];
    let emptySquares = [];
    let computerSquares = [];
    let length = 0;
    let index = -1;
    let result = -1;
    
    opponentSquares = getOpponentSquares();
    emptySquares = getEmptySquares();
    computerSquares = getComputerSquares();

    length = opponentSquares.length;
    //Let's just take the middle square if it's available. If not, take a corner.
    if (length === 1) {
        if (opponentSquares.includes(4)) {
            boardArr[0].innerHTML = 'X';
        } else {
            boardArr[4].innerHTML = "X";
        }
        return;
    } 

    if (playerTwo === "Computer") {
        //first check the computer for a good square allowing it to win
        result = checkToWinOrBlock(emptySquares, computerSquares, "win");
        if (result !== -1) {
            index = result;
            return index;
        }   
    }

    //If the computer doesn't have a winning square yet then make a best effort
    //to strategically choose a good square. Check if we need to block first.
    index = checkToWinOrBlock(emptySquares, opponentSquares, "block");
    if (playerTwo === "Computer" && index === -1) {
        //There is no block needed to stop the opponent so let's figure out
        //which square is best based upon whether the computer has the center
        //square already.
        result = grabNonBlockingSquare(length);
        console.log("After grabNonBlockingSquare RESULT IS ", result);
        if (result !== -1) {
            index = result;
        }
    }
    boardArr[index].innerHTML = 'X';
    boardArr[index].style.pointerEvents = "none";
}

//Beginning of the computer's decision-making process for picking the best square.
const findSquare = () => {

    //This routine 
    checkForBestSquare();
    
    //Since the computer pick does not go thru the eventhandler we need to force the checkForWinner call
    if (checkForWinner()) {
        disableAllSquares();
        startButton.disabled = true;
        resetButton.disabled = false;
    } else {
        renderCurrentPlayer();
    }
}

const initializeScores = () => {

    scoreTally[0].name = playerOne; 
    scoreTally[0].score = 0;

    scoreTally[1].name = playerTwo;
    scoreTally[1].score = 0;

    scoreTally[2].name = "Cat";
    scoreTally[2].score = 0;

}

const startGame = () => {

    let text = `It is now ${whoseTurn}'s turn to play`;
    document.getElementById('currentPlayerLabel').innerText = text;
    initializeScores();
    displayRunningScore();
    enableAllSquares();
    document.getElementById("computer").disabled = true;

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
            disableAllSquares();
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

disableAllSquares();
resetButton.disabled = true;
startButton.disabled = true;


