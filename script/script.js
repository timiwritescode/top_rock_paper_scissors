// let's rock paper scissors yo!

// get the randomIndex since js annoyingly does not have a randome module
// annoyingly
function getRandomIndex() {
    // function to get the random index from 0 to 2
    let randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber > 2) {
        return getRandomIndex();
    } else {
        return randomNumber;
    };
};

// get computer's choice. Rock paper or scissors
function getComputerChoice () {
    let choices = 'rps';
    return choices[getRandomIndex()];
};

// get the user's choice
const usrChoice = document.querySelector('input');
const submitBtn = document.querySelector('button');
let computerChoice = getComputerChoice()

submitBtn.addEventListener('click', () => {getWinner(usrChoice.value, computerChoice)})    

// put both choices against each other and decide based on rule
function declareWinner (player, computer) {
    let draw = player == computer ? true : false
    let win_x = (player === 's' && computer === 'p') 
            || (player === 'r' && computer === 's') 
            || (player === 'p' && computer === 'r') ? true : false 
    if (draw) {
        return 'Draw'
    } else {
        switch (win_x) {
            case true:
                return player;

            case false:
                return computer;
            };
        };
    };


// log player vs computer score upon every round
let playerScore = 0;
let computerScore = 0;


// Utility functions go here
function translateAbbr (abbr) {
    // This function returns the full form of the inputs
    switch (abbr) {
        case 'r':
            return 'Rock';

        case 'p':
            return 'Paper';

        case 's':
            return 'Scissors';
    }
    };


function isRoundComplete (player, computer) {
    // This function check if the player and computer scores add up to five
    // to declare a round complete or not.
    return player + computer === 5 ? true : false
}

function resetGame () {
    // This function reset game when called but reasonably after
    //      best out of a playerScore + gameScore = five
    playerScore = 0;
    computerChoice = 0;
    console.clear()
    console.log('Game Restarted')
}

// The game engine itself
function getWinner (userChoice, computerChoice) {
    console.log(`Your choice: ${translateAbbr(userChoice)}`);
    console.log(`Computer: ${translateAbbr(computerChoice)}`);

    // reload computer choice
    computerChoice = getComputerChoice()

    let winner = declareWinner(userChoice, computerChoice);
    

    switch (isRoundComplete(playerScore, computerScore)) {
        case true:
            console.log(`Final score: Player ${playerScore} - ${computerScore} Computer`)
            let victor = playerScore > computerScore ? 'Player wins' : 'Computer wins'
            console.log(victor)
            resetGame()
            break;

        default:
            // console.clear()
            switch(winner) {
                case userChoice:
                    console.log(`${translateAbbr(userChoice)} beats ${translateAbbr(computerChoice)}`)
                    console.log('You win!')
                    ++playerScore 
                    break;
        
                case computerChoice:
                    console.log(`${translateAbbr(computerChoice)} beats ${translateAbbr(userChoice)}`)
                    console.log('You lose!')
                    ++computerScore
                    break;
        
                case 'Draw':
                    console.log(`${translateAbbr(userChoice)} and ${translateAbbr(computerChoice)} ties!`)
                    console.log('Tie!')  
                };
                console.log(`Player ${playerScore} - ${computerScore} Computer`)
        };               
    };

    
