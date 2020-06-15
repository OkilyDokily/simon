
let colorArray = ['red','green','yellow','blue'];
export class Simon {
  constructor(){
    this.colorSequence = [];
  }
  createRandomColor(){
    this.colorSequence.push(colorArray[Math.floor(Math.random() * 4)]);
  }
  matchesPosition(num, color){
    return this.colorSequence[num - 1] === color;
  }
  reset(){
    this.colorSequence = [];
  }
}

export class Game {
  constructor(){
    this.currentPlayer = "computer";
    this.numberOfColorsClicked = 0;
  }
  changePlayer(){
    if(this.currentPlayer === "computer"){
      this.currentPlayer = "user";
    }
    else{
      this.currentPlayer = "computer";
    }
  }

  reset(){
    this.resetTurns();
    this.currentPlayer = "computer";
  }

  takeTurn(){
    this.numberOfColorsClicked++;
  }

  resetTurns(){
    this.numberOfColorsClicked = 0;
  }
}