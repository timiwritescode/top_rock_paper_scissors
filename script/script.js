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
function getUserChoice () {
    let usrChoice = prompt("Rock, papaer or scissors? (Enter 'r', 'p' or 's'): ")
    return usrChoice;
};

// put both choices against each other and decide based on rule
let computerChoice = getComputerChoice();
let usrChoice = getUserChoice();

function defineRule (x, y) {
    let draw = x == y ? true : false
    let win_x = (x == 's' && y == 'p') 
            || (x == 'r' && y == 's') 
            || (x == 'p' && y == 'r') ? true : false 
    if (draw) {
        console.log('Draw')
    } else {
        switch (win_x) {
            case true:
                console.log('You win')
                break;

            case false:
                console.log('You lose')
                break;
            };
        };
    };

function translateAbbr (abbr) {
    // This function returns the full form of the inputs
    switch (abbr) {
        case 'r':
            return 'Rock'
            break;

        case 'p':
            return 'Paper'
            break;

        case 's':
            return 'Scissors'
            break;
    }
    };

function getWinner (computerChoice, userChoice) {
    console.log(`Your choice: ${translateAbbr(userChoice)}`)
    console.log(`Computer: ${translateAbbr(computerChoice)}`)

    defineRule(userChoice, computerChoice)
}

getWinner(usrChoice, computerChoice);