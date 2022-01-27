addButtonListeners();


// add an event listener to all game buttons (Rock, Paper, Scissor) which triggers playing one round of the game
function addButtonListeners() {

    // select all buttons
    const buttons = document.querySelectorAll('button');

    // iterate through nodelist, add an event listener that plays the game based player choice of button.id
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            var game = new Game();
            game.playRound(button.id).displayResult();

            //  console.log(game.playerWin + " Player: " + game.playerSelection + " Computer: " + game.computerSelection + " #:" + game.numGamesPlayed);
        });
    });
}


function Game() {
    this.playerWin = ""; // 0 = lose, 1 = win, 2 = draw
    this.playerSelection  = "";
    this.computerSelection = "";

    this.numGamesPlayed = 0;
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
    const gameMessages = document.querySelector("#gameMessages");
    const result = document.createElement("div");
    result.textContent = this.playerWin + " Player: " + this.playerSelection + " Computer: " + this.computerSelection + " #:" + this.numGamesPlayed;

    gameMessages.prepend(result);

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
            this.playerSelection = playerSelection;
            this.computerSelection = computerSelection;
            this.numGamesPlayed = this.numGamesPlayed++;
            return this;

        // all cases where player looses
        case(playerSelection == "Rock" && computerSelection == "Paper"):
        case(playerSelection == "Paper" && computerSelection == "Scissors"):
        case(playerSelection == "Scissors" && computerSelection == "Rock"):
            this.playerWin = 0;
            this.playerSelection = playerSelection;
            this.computerSelection = computerSelection;
            this.numGamesPlayed = this.numGamesPlayed++;
            return this;
        
        // default case is a draw
        default:
            this.playerWin = 2;
            this.playerSelection = playerSelection;
            this.computerSelection = computerSelection;
            this.numGamesPlayed = this.numGamesPlayed++;
            return this;

    }

}

// Capitalize the first letter of a string, return all other letters in lower case
// this is the default case for comparison instead of lowercase, to skip the need to reformat to display to the user
function capitalizeFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// DEPRECIATED
// // play 5 games with the player
// // prompt the player for input
// function game() {
//     for (let i = 0; i < 5; i++) {
//         let roundNumber = i+1;
//         console.log("Round #" + (roundNumber) + ": " + playRound(playerInput(roundNumber), computerPlay()));
//     }
// }

// DEPRECIATED
// prompt the user to enter rock, paper or scissors
// keep prompting user until correct input is entered
// function playerInput(roundNumber) {
//     let input;
//     while (true) {
//         input = window.prompt("Round #" + roundNumber + ": Rock, Paper or Scissors?")
        
//         // format user input
//         input = capitalizeFirstChar(input);

//         // Accept input of "Scissor" instead of "Scissors". Change "Scissor" into "Scissors"
//         if (input == "Scissor")
//             input = "Scissors";

//         if(input == "Rock" || input == "Paper" || input == "Scissors")
//             return input;
//     }
// }