// need to find a more elegant way that avoids the use of global variables
let numGamesPlayed = 0;
let numPlayerWins = 0;
let numComputerWins = 0;

addButtonListeners();


// add an event listener to all game buttons (Rock, Paper, Scissor) which triggers playing one round of the game
function addButtonListeners() {

    // select all buttons
    const buttons = document.querySelectorAll('button');

    const game = new Game();
    // iterate through nodelist, add an event listener that plays the game based player choice of button.id
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            game.playRound(button.id).displayResult();

        });
    });
}


function Game() {
    this.playerWin = ""; // 0 = player lose, 1 = player win, 2 = draw
    this.playerSelection  = "";
    this.computerSelection = "";
}

// randomly return Rock, Paper or Scissor as a string
function computerPlay() {

    // generate a random whole number between 0-2
    let randomNumber = Math.floor(Math.random() * 3);
    // console.log(Math.floor(0.9) + " " + Math.floor(1.4) + " " + Math.floor(2.5))
    // console.log("randomNumber:" + randomNumber);

    //if random number = 0, return rock
    if (randomNumber == 0){
        return "Rock";
    }
    //if random number = 1, return paper
    else if (randomNumber == 1)
    {
        return "Paper";
    } 
    //if random number = 2, return scissors
    else if (randomNumber == 2) {
        return "Scissors";
    }
    // error handling
    else {
        console.alert("Error generating random number in computerPlay()");
    }
}

Game.prototype.displayResult = function () {
    
    const scorekeeper = document.querySelector("#scorekeeper");

    // remove old score 
    while(scorekeeper.firstChild) {
        scorekeeper.removeChild(scorekeeper.firstChild);
    }

    // add new score
    const score = document.createElement("div");
    score.textContent = "Player: " + numPlayerWins + " Computer: " + numComputerWins;

    const roundResult = document.querySelector("#roundResult");
    const round = document.createElement("div");
    

    const gameWon = document.createElement("div");
    if (numPlayerWins == 5)
    {
        gameWon.textContent = "Player wins! Game reset";
        round.textContent = "Player wins! Game reset";
        numGamesPlayed = 0;
        numPlayerWins = 0;
        numComputerWins = 0;
        scorekeeper.prepend(gameWon);
    } else if (numComputerWins == 5)
    {
        gameWon.textContent = "Computer wins! Game reset";
        round.textContent = "Computer wins! Game reset";
        numGamesPlayed = 0;
        numPlayerWins = 0;
        numComputerWins = 0;
        scorekeeper.prepend(gameWon);
    }
    else {
        round.textContent = "Player plays " + this.playerSelection + ". Computer plays " + this.computerSelection + ". Round#" + numGamesPlayed;
    }

    scorekeeper.append(score);
    roundResult.prepend(round);

    return this;
}



// play one round of the game, return a string that declares the winner of the game/results of the game
// input: playerSelection case insensitive
// use computerPlay() for the game to pick a play

// Logic: Paper beats Rock, Scissor beats Paper, Rock beats Scissors. All other cases result in a tie
Game.prototype.playRound = function (playerSelection) {

    // format input so its comparable with output of computerPlay() (First character capitalized, all other chars lowercase)
    // unecessary as long as html is formatted correctly, but keeping it just in case inputs change in the future
    playerSelection = capitalizeFirstChar(playerSelection);
    let computerSelection = computerPlay();

    // console.log("playerSelection:" + playerSelection + " computerSelection: " + computerSelection);

    switch(true) {
        // all cases where player wins
        case(playerSelection == "Paper" && computerSelection == "Rock"):
        case(playerSelection == "Scissors" && computerSelection == "Paper"):
        case(playerSelection == "Rock" && computerSelection == "Scissors"):
            this.playerWin = 1;
            numPlayerWins++;
            this.playerSelection = playerSelection;
            this.computerSelection = computerSelection;
            numGamesPlayed++;
            return this;

        // all cases where player looses
        case(playerSelection == "Rock" && computerSelection == "Paper"):
        case(playerSelection == "Paper" && computerSelection == "Scissors"):
        case(playerSelection == "Scissors" && computerSelection == "Rock"):
            this.playerWin = 0;
            numComputerWins++;
            this.playerSelection = playerSelection;
            this.computerSelection = computerSelection;
            numGamesPlayed++;
            return this;
        
        // default case is a draw
        default:
            this.playerWin = 2;
            this.playerSelection = playerSelection;
            this.computerSelection = computerSelection;
            numGamesPlayed++;
            return this;

    }

}

// Capitalize the first letter of a string, return all other letters in lower case
// this is the default case for comparison instead of lowercase, to skip the need to reformat to display to the user
function capitalizeFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}