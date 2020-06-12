import $ from 'jquery';
import 'bootstrap';
import { Simon, Game } from './simon.js';
import './styles.css';


let colors;

let darkColors = {
  "red": "rgb(155, 17, 17)",
  "green":"rgb(12, 83, 12)",
  "yellow":"rgb(114, 114, 5)",
  "blue": "rgb(8, 8, 92)"
}

let currentTestColorNumber;

let brightenNumber = 0;
let brighten = function(color){
  brightenNumber++;
  $("#" + color).css("background-color", color);
  if (brightenNumber < 40){
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
    else{
      game.changePlayer(); 
    }
  }
};

let simon = new Simon();
let game = new Game();

$(document).ready(function(){

  $("body").on("click","div",function(){
    if(game.currentPlayer === "user"){
      let color = $(this).attr("id");
      currentTestColorNumber++;
      if(currentTestColorNumber > simon.colorSequence.length - 1){
        simon.createRandomColor();
        game.changePlayer();
        colors = simon.colorSequence;
        requestAnimationFrame(function(){
          brighten(colors.shift());
        })
        return;
      }
      if(simon.matchesPosition(currentTestColorNumber,color)){ 
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
    simon.createRandomColor();
    colors = simon.colorSequence;
    
    currentTestColorNumber = 0;
    requestAnimationFrame(function(){
      brighten(colors.shift())
    });
  });
  })

  

 


