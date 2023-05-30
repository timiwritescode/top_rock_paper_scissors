// let's rock paper scissors yo!
const playerChoice = document.querySelector('.player-panel').children;

console.log(playerChoice)


// get the randomIndex since js annoyingly does not have a random module
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

function unPresentComputerWeapon() {
    let weaponContainer = document.querySelector('#computer-choice');
    console.log(weaponContainer)
    if (weaponContainer.children[0]){
    weaponContainer.removeChild(weaponContainer.children[0])
    };
};

function presentComputerWeapon(computerWeapon) {
    let computerPanel = document.querySelector('.computer-panel');
    Array.from(computerPanel.children).forEach((f) => {
        if (f.id === computerWeapon) {
            
            presentWeapon(f, '#computer-choice')
        }
    });

}

function presentWeapon(weapon, classname) {
    let container = document.querySelector(classname);
    let weaponChoice = weapon.children[0].cloneNode(true);
    weaponChoice.className = 'choice-img';
    if (container.children[0] === undefined) {
        
        container.appendChild(weaponChoice)
        
    } else {
        
        container.replaceChild(weaponChoice, container.children[0])
        
    };
    
};

// get the user's choice
let usrChoice ;

Array.from(playerChoice).forEach((choice) => {
        choice.addEventListener('click', () => {
            usrChoice = choice.id;
            presentWeapon(choice, '#player-choice');
            unPresentComputerWeapon()    
        }) 
});

const submitBtn = document.querySelector('button');
let computerChoice = getComputerChoice()

submitBtn.addEventListener('click', () => {getWinner(usrChoice, computerChoice);})    

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

let uiPlayerScore = document.querySelector('.player-score')
let uiComputerScore = document.querySelector('.computer-score')

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
    if (player === 3 || computer === 3) {
        return true
    };
    return false;
};

function resetGame () {
    // This function reset game when called but reasonably after
    //      best out of a playerScore + gameScore = five
    playerScore = 0;
    computerScore = 0;
    uiComputerScore.textContent = computerScore
    uiPlayerScore.textContent = playerScore
    console.clear()
    console.log('Game Restarted')

}

function displayWinner(winner) {
    // This function displays the winner after each round of game
    let winnerContainer = submitBtn.parentNode;
    let weapons = playerChoice;

    Array.from(weapons).forEach((weapon)=> {
        if (weapon.id === winner) {
            let roundWinner = weapon.cloneNode(true);
            roundWinner.className = 'round-winner';
            if (!winnerContainer.children[1]) {
                winnerContainer.append(roundWinner)
            } else {
               winnerContainer.replaceChild(roundWinner, winnerContainer.children[1])
            };
            
        };
    })    

     
};



// The game engine itself
function getWinner (userChoice, computerChoice) {
    console.log(`Your choice: ${translateAbbr(userChoice)}`);
    console.log(`Computer: ${translateAbbr(computerChoice)}`);

    // Test the game state
    switch (isRoundComplete(playerScore, computerScore)) {
        case true:
            console.log(`Final score: Player ${playerScore} - ${computerScore} Computer`)
            let victor = playerScore > computerScore ? 'Player wins' : 'Computer wins'
            console.log(victor)
            resetGame()
            break;

        default:
            // console.clear()
            // reload computer choice
            computerChoice = getComputerChoice()
            presentComputerWeapon(computerChoice)
            if (userChoice) {
                let winner = declareWinner(userChoice, computerChoice);
            displayWinner(winner)
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
        } else {
            alert('Choose something')
        };
            }
            

    
    

    
        uiComputerScore.textContent = computerScore
        uiPlayerScore.textContent = playerScore               
    };

    
