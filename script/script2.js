// Add functionality for the rock paper scissors logo

let pageTitle = document.querySelector('h1');



let intId;
let y = 0;

let rps = ['rock!', 'paper!!', 'scissors!!!']


function changeClassName (number) {
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