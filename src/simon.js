
let colorArray = ['red','green','yellow','blue'];
export class Simon {
  constructor(){
    this.colorSequence = [];
  };
  createRandomColor(){
    this.colorSequence.push(colorArray[Math.floor(Math.random() * 4)]);
  }
  matchesPosition(num, color){
    return this.colorSequence[num] === color;
  }

}

export class Game {
  constructor(){
    this.currentPlayer = "computer";
  }
  changePlayer(){
    if(this.currentPlayer === "computer"){
      this.changePlayer = "user";
    }
    else{
      this.currentPlayer = "computer";
    }
  }
}