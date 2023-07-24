// Add functionality for the rock paper scissors logo


function changeClassName (number) {
    const pageTitle = document.querySelector('h1');

    switch (number) {
        case 1:
            pageTitle.className = 'paper'
            break;
        
        case 2:
            pageTitle.className = 'scissors'
            break;

        default:
            pageTitle.className = 'rock'
}
}


function startInterval () {
    let x = 0;
    let y = 0;
    const pageTitle = document.querySelector('h1');
    
    let rps = ['rock!', 'paper!!', 'scissors!!!']
    let increment = true;
    pageTitle.textContent = '';
    setInterval(() => {
        let weapon = rps[y];
        changeClassName(y)
            if (increment) {
                if (weapon[x] === undefined) {
                    pageTitle.textContent += ' ';
                } else {
                    let newSpan = document.createElement('span');
                    newSpan.textContent = weapon[x];
                    newSpan.className = 'title-span';
                    pageTitle.appendChild(newSpan);
                }
                x += 1;
                increment = x == weapon.length  + 10? false : true;
            } else {
                pageTitle.textContent = weapon.slice(0, x-1)
                x -= 1;
                
                if (x == 0) {
                    increment = true;
                    y += 1;
                    
                    if (y == rps.length) {
                        y = 0;
                    }
                    
                } else {
                    increment = false;
                }
            };
            
}, 150)}

startInterval()

export function toggleInstructions () {
    let navButton = document.querySelector('.toggle-pop-up');
    let instructionBtn = document.querySelector('.instruction-header');
    let rulesBtn = document.querySelector('.rules-header');
    navButton.addEventListener('click', () => {
        let popUp = document.querySelector('.blur-bg');
        popUp.style.display = 'flex';
    });

    instructionBtn.addEventListener('click', () => {
        let popUp = document.querySelector('.blur-bg');
        let welcomeMsg = document.querySelector('.welcome');
        let instruction = document.querySelector('.instruction');
        let rules = document.querySelector('.rules');
        let rulesBtn = document.querySelector('.rules-btn');
        let instructionBtn = document.querySelector('.instruction-btn')
        welcomeMsg.style.display = 'none';
        popUp.style.display = 'flex';
        instruction.style.display = 'inherit';
        rulesBtn.style.display = 'none';
        instructionBtn.style.display = 'none';
        rules.style.display = 'none';
        
    });

    rulesBtn.addEventListener('click', () => {
        let popUp = document.querySelector('.blur-bg');
        let welcomeMsg = document.querySelector('.welcome');
        let rules = document.querySelector('.rules');
        let instruction = document.querySelector('.instruction');
        let rulesBtn = document.querySelector('.rules-btn');
        let instructionBtn = document.querySelector('.instruction-btn')
        welcomeMsg.style.display = 'none';
        popUp.style.display = 'flex';
        rules.style.display = 'inherit';
        instruction.style.display = 'none';
        rulesBtn.style.display = 'none';
        instructionBtn.style.display = 'none'
        
    });

};

toggleInstructions()


export function togglePopUp () {
    let popUp = document.querySelector('.blur-bg');
    let playBtn = document.querySelector('.play-btn')
    let instructionBtn = document.querySelector('.instruction-btn');
    let rulesBtn = document.querySelector('.rules-btn');
    let rules = document.querySelector('.rules');
    let instruction = document.querySelector('.instruction')
    playBtn.addEventListener('click', () => {
        popUp.style.display = 'none'; 
    });

    rulesBtn.addEventListener('click', () => {
        rules.style.display = 'inherit';
        instruction.style.display = 'none';

    });

    instructionBtn.addEventListener('click', () => {
        instruction.style.display = 'inherit';
        rules.style.display = 'none';
    });
};

// initializations

window.addEventListener('load', togglePopUp);