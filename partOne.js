// Part One of BattleShip Project

let rs = require('readline-sync');
const alphabet = 'ABC'
const shipCount = 2;
let fleet = [];

 const placeShips =(alph)=> {
        let x = alphabet[Math.floor(Math.random()* alph.length)];
        let y = Math.floor(Math.random()* alph.length ) + 1;
        return ([x+y].toString());
 }

 const placeAllShips = (alph) => {
    for(let i = 0; i < shipCount; i++) {
        const newShip = placeShips(alph)
        if(fleet.includes(newShip)){
            i--;
        } else {
            fleet.push(newShip)
        };
    };
 };

 const strike = () => {
    let shot = rs.question('Fire at will Commander!...').toUpperCase();
    if (fleet.includes(shot)) {
        console.log('Hit! You sunk my Battle Ship');
          fleet.splice(fleet.indexOf(shot), 1);
         
    } else {
        console.log('Miss!');
        return strike();
    };
};

  const battleShip = (alph) => {
    placeAllShips(alph);
     console.log(fleet);
      while (fleet.length > 0) {
        strike()
    }
    console.log('Winner!')
   };


const startGame = () => {
let playAgain = rs.keyInYN('Would you like to play again?')
  if(playAgain === true){
      battleShip(alphabet);
   } else {
            console.log('Thank you for playing, bye..')
    };

};

let anyKey = rs.keyIn('Press any key to continue...');
console.log('Let\'s Go!!')
battleShip(alphabet)
startGame();
