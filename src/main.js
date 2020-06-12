//import $ from 'jquery';
import 'bootstrap';
import { Simon, Game } from './simon.js';
import './styles.css';

let simon = new Simon();
let game = new Game();
let colors;
let currentTestColorNumber;
let darkColors = {
  "red": "rgb(155, 17, 17)",
  "green":"rgb(12, 83, 12)",
  "yellow":"rgb(114, 114, 5)",
  "blue": "rgb(8, 8, 92)"
}



let brightenNumber = 0;
let brighten = function(color){
  brightenNumber++;
  $("#" + color).css("background-color", color);
  let brightenNumberLimit = (game.currentPlayer === "computer") ? 40 : 5
  if (brightenNumber < brightenNumberLimit){
    requestAnimationFrame(function(){
      brighten(color);
    });
  }
  else{
    $("#" + color).css("background-color", darkColors[color]);
    brightenNumber = 0;
    if(colors.length > 0){
      requestAnimationFrame(function(){
        brighten(colors.shift());
      });
    }
    else if (game.currentPlayer === "computer"){
      game.changePlayer(); 
    }
  }
};



$(document).ready(function(){

  $("body").on("click","div",function(){

    if(game.currentPlayer === "user"){
    
      let color = $(this).attr("id");
      
      if(currentTestColorNumber === simon.colorSequence.length - 1){
        simon.createRandomColor();
        game.changePlayer();
        currentTestColorNumber = 0;
        colors = [...simon.colorSequence];
        requestAnimationFrame(function(){
          brighten(colors.shift());
        })
        
        return;
      }
      if(simon.matchesPosition(currentTestColorNumber,color)){ 
        currentTestColorNumber++;
        requestAnimationFrame(function(){
          brighten(color);
        });
      }
      else{
        console.log("game over")
      }
    }  
    
    
  });

  $("button").click(function(){
    resetValues(); 
    simon.createRandomColor();
    colors = [...simon.colorSequence];
    
    currentTestColorNumber = 0;
    requestAnimationFrame(function(){
      brighten(colors.shift())
    });
  });

})

function resetValues(){
  simon.reset();
  game.reset();
}



  

 


