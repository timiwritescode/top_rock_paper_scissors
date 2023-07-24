import { toggleInstructions, togglePopUp, startInterval } from "./util.js";

// let's rock paper scissors yo!
const playerChoice = document.querySelector('.player-panel').children;


// get a random index between 0 and 2
function getRandomIndex() {
    // function to get the random index from 0 to 2

    return Math.floor(Math.random() * 3);
};

// get computer's choice. Rock paper or scissors
function getComputerChoice () {
    let choices = ['r','p', 's'];
    
    return choices[getRandomIndex()];
};

// Function to remove computer weapon from computer choice panel
function unPresentComputerWeapon() {
    let weaponContainer = document.querySelector('.computer-choice');
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
        console.log(winner)        
        winner.classList.remove(winner.classList[2]);
        winner.removeChild(winner.children[1]);
    };
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
    let para = document.querySelector('.result')
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
    let draw = player == computer ? true : false;
    let para = document.querySelector('.result');
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
    let submitBtn = document.querySelector('.button')
    let resetButton = document.createElement('button');
    resetButton.className = 'reload';
    resetButton.addEventListener('click', () => {
        
        playerScore = 0;
        computerScore = 0;
        returnToScratch()
        toggleInstructions();
        togglePopUp();
        startInterval()        
    })
    submitBtn.parentNode.replaceChild(resetButton, submitBtn)
}


// Function to display winner of after each round
function displayWinner(winner) {    
    let submitBtn = document.querySelector('.button')
    let winnerContainer = submitBtn.parentNode;
    let weapons = playerChoice;

    Array.from(weapons).forEach((weapon)=> {
        if (weapon.id === winner) {
            let roundWinner = weapon.cloneNode(true);
            roundWinner.className = 'round-winner';
            
            // Add the winner color to the winner declaration
            let playerChoiceContainer = document.querySelector('.player-choice-panel').children;
            let newClass = winner === playerChoiceContainer[0].id ? 
                    'player-choice-panel' : 
                    'computer-choice-panel';
            
            if (!winnerContainer.children[1]) {
                console.log(winnerContainer)
                winnerContainer.append(roundWinner)
            } else {
               winnerContainer.replaceChild(roundWinner, winnerContainer.children[1]);
            };
            roundWinner.parentNode.classList.add(newClass);
            
        };
    });         
};


// Function to get the winner of each rally
function getWinner (userChoice) {
    // Test the game state
    switch (isRoundComplete(playerScore, computerScore)) {
        case true:

            showFinalWinner(playerScore, computerScore)
            break;

        default:            
            // reload computer choice
            
            if (userChoice) {
                let computerChoice = getComputerChoice()
                presentComputerWeapon(computerChoice)
                let winner = declareWinner(userChoice, computerChoice);
                let analysisPara = document.querySelector('.analysis');
                
                displayWinner(winner)
                switch(winner) {
                    case userChoice:
                        analysisPara.textContent = `${translateAbbr(userChoice)} beats ${translateAbbr(computerChoice)}`;
                        analysisPara.className = 'analysis analyis-winner';
                        console.log(`${translateAbbr(userChoice)} beats ${translateAbbr(computerChoice)}`)
                        console.log('You win!')
                        ++playerScore 
                        
                        break;
            
                    case computerChoice:
                        analysisPara.textContent = `${translateAbbr(computerChoice)} beats ${translateAbbr(userChoice)}`;
                        analysisPara.className = 'analysis analysis-loser'
                        console.log(`${translateAbbr(computerChoice)} beats ${translateAbbr(userChoice)}`)
                        console.log('You lose!')
                        ++computerScore
                        
                        break;
            
                    case 'Draw':
                        analysisPara.textContent = `${translateAbbr(userChoice)} and ${translateAbbr(computerChoice)} ties!`;
                        analysisPara.className = 'analysis analysis-draw';
                        console.log(`${translateAbbr(userChoice)} and ${translateAbbr(computerChoice)} ties!`)
                        console.log('Tie!')  
                    };
                console.log(`Player ${playerScore} - ${computerScore} Computer`)
            } else {
                alert('Choose something')
            };
                };    

            // display each player's score in the UI
            let uiPlayerScore = document.querySelector('.player-score');
            let uiComputerScore = document.querySelector('.computer-score');

            uiComputerScore.textContent = computerScore
            uiPlayerScore.textContent = playerScore               
        };


// Initialilzations;
let submitBtn = document.querySelector('.button');

let intervalId;
let usrChoice;

// log player vs computer score upon every round
let playerScore = 0;
let computerScore = 0;


// function to log player choice in weapon section
function setPlayerChoice (choice) {
    usrChoice = choice.id;
    let para = document.querySelector('.result')
        let analysis = document.querySelector('.analysis');
        analysis.textContent = 'Rock, Paper, Scissors';
        analysis.className = 'analysis';
        if (playerScore === 5 || computerScore === 5) {
            console.log('No');
            
        } else {    
            presentWeapon(choice, '.player-choice');
            let choicePanel = document.querySelectorAll('.choice-container');
            
            choicePanel[0].classList.add('player-choice-panel');
            unPresentComputerWeapon(); 
            para.textContent = '....';
            changeResultContent();
        };
        // if there is currently a winner's insignia in the middle panel
        // remove the insignia
        removeInsignia()
};


// function to use submit button
function useSubmitBtn () {
    if (playerScore === 5 || computerScore === 5) {
        showFinalWinner(playerScore, computerScore)
        resetGame();
    } else {
        getWinner(usrChoice);
        clearInterval(intervalId)
    };
    
}

// function remove winner's insignia
function removeInsignia () {
    let versus = document.querySelector('.versus');
    let winnerColor = versus.classList[2]
    if (versus.classList.length > 2) {
        versus.classList.remove(winnerColor)
    }; 
}

Array.from(playerChoice).forEach((choice) => {
   
    choice.addEventListener('click', () => {
        setPlayerChoice(choice)
          
    }) 
});

submitBtn.addEventListener('click', useSubmitBtn);    

// save the html/ dom at the initial state to a variable
let bodyElement = document.body; 
let savedState = '';
savedState = bodyElement.innerHTML;

function returnToScratch () {
    let bodyElement = document.body;
    bodyElement.innerHTML = savedState;

    // let's rock paper scissors yo!
    const playerChoice = document.querySelector('.player-panel').children;

        let fightBtn = document.querySelector('.button');

    Array.from(playerChoice).forEach((choice) => {
           choice.addEventListener('click', () => {
           setPlayerChoice(choice);
        }) 
    });
    usrChoice = undefined;
    intervalId = undefined;

    fightBtn.addEventListener('click', useSubmitBtn);

}

