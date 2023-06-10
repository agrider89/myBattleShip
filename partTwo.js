 // Variables
 let rs = require('readline-sync');
 let shipSizes = [5,4,3,3,2]

startGame()
function startGame () {
 // Game Variables
    let counter = 0
    let shotTracker = [];
   
// Press any key to continue.
let anyKey = rs.keyIn('Press any key to continue...');

// Place Ships
function findingCoords() {     
    let shipCoords = (shipSizes.map(size => placeShips(size) ))

function placeShips(size) {
    let shipPosition = [];
    let direction = Math.floor(Math.random()*2+1)

    // Determines direction of Ship
    function whichDirection() {
        if(direction === 1){
            verticalPlacement();
        } else {
            horizontalPlacement();
        }
    }
    whichDirection();
    
 // Positioning for Vertical Placement
    function verticalPlacement() {
        let randomSpot = [Math.floor(Math.random()*10+1-1),Math.floor(Math.random()*10+1-1)]
        if(randomSpot[0] + size < 10){ 
            for(let i = randomSpot[0]; i <= 9; i++) {
                while(shipPosition.length < size) {
                shipPosition.push([i++,randomSpot[1]])
              }
            }
        } else {
            return verticalPlacement();
        }
    }
  
    // Positioning for Horizontal Placement
      function horizontalPlacement(){
        let randomSpot = [Math.floor(Math.random()*10+1-1),Math.floor(Math.random()*10+1-1)]
        if(randomSpot[1] + size < 10){ 
            for(let i = randomSpot[1]; i <= 9; i++) {
                while(shipPosition.length < size) {
                 shipPosition.push([randomSpot[0],i++])
              };
           };
        } else {
             return horizontalPlacement();
            
          };
       }; 
         return shipPosition;    
     };

// Functions Check If ShipCoords Are Repeated
function checkNestedPairs(arr) {
    let array = arr.flat();   
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (checkPairs(array[i], array[j])) {
          return findingCoords();       
        };
      };
    };
    return shipCoords;
  };
//  Checks Pairs
  function checkPairs(pair1, pair2) {
    if (pair1.length !== 2 || pair2.length !== 2) {
      return false;
    };
    return pair1[0] === pair2[0] && pair1[1] === pair2[1];
  };
 return checkNestedPairs(shipCoords);
};

let ships = findingCoords();

// Grid Function
function myGrid(size) {
    let newArr = [];
    for(let i = 0; i<size; i++){
        let row = [];
         for(let j = 0; j<size; j++){
           row.push('.');
         };
        newArr.push(row);
    };
    return newArr;

};
let battleGrid = myGrid(10);
printGrid(battleGrid);
function printGrid(grid) {
    const headers = createHeaders(grid.length)
    console.log(headers)
    
    for(let i = 0; i < grid.length; i++) {
      let alphabet ='ABCDEFGHIJ'.split('')
      let rowStr = alphabet[i] + ' ';
      for(let cell of grid[i]){
        rowStr += cell + ' ';
      }
      console.log(rowStr);
    };
  };
  
  function createHeaders(size) {
    let result = '  ';
    for(let i = 1; i <= size; i++){
      result +=  i + ' ';
    };
    return result;
  };

// This logs all ship coordinates. Must +1 to numerical coordinate. ie. [0,0] == A1
// console.log(ships)
console.log('Enemy ships detected!');

// Main shots called function.
function shotCoordinates() {  
    let shotsHit = [];
    let shotsMiss = [];

//    Turns user coordinates into numbers to match array of shipCoords
    
      function lettersToNumbers() {
        let firstShot = rs.question('Fire at will! ');  
        let shotCalled = [];
        let alphabet = 'abcdefghij'.toUpperCase().split('');
        let numbers = [1,2,3,4,5,6,7,8,9,10];              
        let coords = firstShot.split('');
        let index1 = alphabet.findIndex(x => x === coords[0]);
        let ten = (coords[1]+coords[2])*1;
        //  Checks if theres a valid input
          if(index1 <= -1  || index1 > 9 || ten > 10 || coords[1]*1 <= 0) {
            console.log('Invalid choice')
              return lettersToNumbers();
           } 
            if(coords.length===3) {
                 let index2 = numbers.findIndex(x => x === ten);
                 shotCalled.push(index1);
                  shotCalled.push(index2);
                  return shotCalled
            } else {
                let index2 = numbers.findIndex(x => x === coords[1]*1);
                 shotCalled.push(index1);
                  shotCalled.push(index2);
                   return shotCalled;
            };
       };
let shots = lettersToNumbers()
if(shots===undefined){
    shotCoordinates();
}

//   Tracks Hits and Misses
  function hitOrMiss() {
    let shipArray = ships.flat()
    let answer = shipArray.find(coord => coord[0] === shots[0] && coord[1] === shots[1])
    let sameShot = shotTracker.find(coord => coord[0] === shots[0] && coord[1]===shots[1])
      if(answer && !sameShot) {
         shotsHit.push(answer)
          shotTracker.push(answer)
           putOnGrid(shotsHit, 'X')
            counter++
             console.log('Hit!')
              console.log(`Hit Count: ${counter}/17`)  
       } else if(sameShot){
          console.log('Already fired upon')
       } else {
         console.log('miss, try again');
          shotsMiss.push(shots);
           putOnGrid(shotsMiss, 'O')
       }
       
 }

  hitOrMiss()


 

 //  Places Hits and Misses On Grid
 function putOnGrid(arr,char) {
    for(let index of arr) {
        let x = index[0];
         let y = index[1];
          battleGrid[x][y] = char;
    }; 
 };

 printGrid(battleGrid) 
  
};

// Continues program until all ships are sunk.
  while (counter < 17) {
    shotCoordinates();
  };
console.log('Mission Accomplished!');

// Asks players if they would like to play again.
let playAgain = rs.keyInYN('Would you like to play again?');

  if(playAgain){
    console.log('Starting new game..');
     startGame();
  } else {
    console.log('Until next time Commander...');
  }

    
}