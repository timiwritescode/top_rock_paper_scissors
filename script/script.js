// let's rock paper scissors yo!
const playerChoice = document.querySelector('.player-panel').children;
let para = document.querySelector('.result');

console.log(playerChoice)


// get the randomIndex since js annoyingly does not have a random module
// annoyingly
function getRandomIndex() {
    // function to get the random index from 0 to 2
    let random = Math.floor(Math.random() * 10);
    if (random > 2) {
        random = getRandomIndex();
        return random
    }
    return random;
};

// get computer's choice. Rock paper or scissors
function getComputerChoice () {
    let choices = 'rps';
    
    return choices[getRandomIndex()];
};

// Function to remove computer weapon from computer choice panel
function unPresentComputerWeapon() {
    let weaponContainer = document.querySelector('.computer-choice');
    console.log(weaponContainer)
    if (weaponContainer.children[0]){
    weaponContainer.removeChild(weaponContainer.children[0])
    let computerChoicePanel = document.querySelectorAll('.choice-container')[1]
    computerChoicePanel.classList.remove('computer-choice-panel')
    
    // Remove the winner's background from the center
    // this should later go to a reset button
    let winner = document.querySelector('.versus');
    if (winner.classList.contains('player-choice-panel') || 
        winner.classList.contains('computer-choice-panel')) {
        // then there is a current winner, remove that winner and the color
        console.log('Middle');
        
        winner.classList.remove(winner.classList[2]);
        winner.removeChild(winner.children[1]);
        console.log(Array.from(winner.classList));
    }
    };
};

// Function to put the computer's random choice in the computer choice panel
function presentComputerWeapon(computerWeapon) {
    let computerPanel = document.querySelector('.computer-panel');
    Array.from(computerPanel.children).forEach((f) => {
        if (f.id === computerWeapon) {
            presentWeapon(f, '.computer-choice');
            let computerChoicePanel = document.querySelectorAll('.choice-container')[1]
            computerChoicePanel.classList.add('computer-choice-panel');
        }
    });
};

// Function to present the weapon of player in the player weapon panel
function presentWeapon(weapon, classname) {
    let container = document.querySelector(classname);
    let weaponChoice = weapon.children[0].cloneNode(true);
    weaponChoice.className = 'choice-img';

    if (container.children[0] === undefined) {
        container.appendChild(weaponChoice);
    } else {
        container.replaceChild(weaponChoice, container.children[0]);  
    };
    weaponChoice.parentNode.id = weapon.id
};


// Function to nicely display the content of p.result
function changeResultContent () {
    let x = 0;
    if (para.textContent === '....') {
        intervalId = setInterval(() => {
            if (x % 4 == 0) {
                para.textContent = '.';
            } else {
                para.textContent += '.'
            }
            x += 1
        }, 200)
    }
};

// Function to put both choices against each other and decide based on rule
function declareWinner (player, computer) {
    let draw = player == computer ? true : false
    let win_x = (player === 's' && computer === 'p') 
            || (player === 'r' && computer === 's') 
            || (player === 'p' && computer === 'r') ? true : false 
    // declare the result UI
    if (draw) {
        para.textContent = "It's a tie!";
        para.style.color = 'var(--tie-color)';
        return 'Draw'
    } else {
        switch (win_x) {
            case true:
                
                para.textContent = "You win!";
                para.style.color = 'var(--winner-color)';
                return player;

            case false:
                para.textContent = "You lose!";
                para.style.color = 'var(--loser-color)';
                return computer;
            };
        };
};


// Utility functions go here
// Function to present colors of final loser or winner of game
function showFinalWinner (finalPlayerScore, finalComputerScore) {
    let finalPlayerContainer = document.querySelectorAll('.player-final');
    let finalComputerContainer = document.querySelectorAll('.computer-final');
    let finalWinner = document.querySelector('.winner-final');
    
    if (finalPlayerScore > finalComputerScore) {
        
        Array.from(finalPlayerContainer).forEach((player) => {
            player.classList.add('winner');
        })
        Array.from(finalComputerContainer).forEach((player) => {
            player.classList.add('loser');
        })
    } else {
        Array.from(finalPlayerContainer).forEach((player) => {
            player.classList.add('loser');
        })
        Array.from(finalComputerContainer).forEach((player) => {
            player.classList.add('winner');})
    };
    finalWinner.classList.add('winner');   
};


//Function to convert abbreviation to full form
function translateAbbr (abbr) {
    // This function returns the full form of the inputs
    switch (abbr) {
        case 'r':
            return 'Rock';

        case 'p':
            return 'Paper';

        case 's':
            return 'Scissors';
    };
    };


//Function to check if either of scores is up to five 
//  (to check if round is complete)
function isRoundComplete (player, computer) {
    if (player === 5 || computer === 5) {
        
        return true
    };
    return false;
};

// Function to reset game
function resetGame () {
    let resetButton = document.createElement('button');
    resetButton.className = 'reload';
    resetButton.addEventListener('click', () => {
        location.reload(true)
    })
    submitBtn.parentNode.replaceChild(resetButton, submitBtn)
}


// Function to custom remove every event listener
function customRemoveEventListener (parent, child) {
    let newChild = child.cloneNode(true);
    child.parentNode.replaceChild(newChild, child)
}

// Function to display winner of after each round
function displayWinner(winner) {    
    let winnerContainer = submitBtn.parentNode;
    let weapons = playerChoice;

    Array.from(weapons).forEach((weapon)=> {
        if (weapon.id === winner) {
            let roundWinner = weapon.cloneNode(true);
            roundWinner.className = 'round-winner';
            
            // Add the winner color to the winner declaration
            let playerChoiceContainer = document.querySelector('.player-choice-panel').children;
            console.log(playerChoiceContainer[0].children[0].id)
            let computerChoiceContainer = document.querySelector('.computer-choice-panel').children;
            console.log(computerChoiceContainer[0].children)
            let newClass = winner === playerChoiceContainer[0].id ? 
                    'player-choice-panel' : 
                    'computer-choice-panel';
            
            if (!winnerContainer.children[1]) {
                winnerContainer.append(roundWinner)
            } else {
               winnerContainer.replaceChild(roundWinner, winnerContainer.children[1]);
            };
            roundWinner.parentNode.classList.add(newClass);
            
        };
    });         
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
            showFinalWinner(playerScore, computerScore)
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
            };    
        uiComputerScore.textContent = computerScore
        uiPlayerScore.textContent = playerScore               
    };


// Initialilzations;
let submitBtn = document.querySelector('.button');
let computerChoice = getComputerChoice()
let usrChoice ;
let intervalId;

// log player vs computer score upon every round
let playerScore = 0;
let computerScore = 0;

let uiPlayerScore = document.querySelector('.player-score');
let uiComputerScore = document.querySelector('.computer-score');



Array.from(playerChoice).forEach((choice) => {
   
    choice.addEventListener('click', () => {
        usrChoice = choice.id;
        if (playerScore === 5 || computerScore === 5) {
            console.log('No');
        } else {    
            presentWeapon(choice, '.player-choice');
            let choicePanel = document.querySelectorAll('.choice-container');
            choicePanel[0].classList.add('player-choice-panel');
            unPresentComputerWeapon(); 
            para.textContent = '....';
            changeResultContent();
        }
        
    }) 
});

submitBtn.addEventListener('click', () => {
    if (playerScore === 5 || computerScore === 5) {
        showFinalWinner(playerScore, computerScore)
        resetGame();
    } else {
        getWinner(usrChoice, computerChoice);
        clearInterval(intervalId)
    };
    
});    