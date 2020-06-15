import $ from 'jquery';
import 'bootstrap';

import { Simon, Game } from './simon.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

let simon = new Simon();
let game = new Game();
let colors = [];

let darkColors = {
  "red": "rgb(155, 17, 17)",
  "green":"rgb(12, 83, 12)",
  "yellow":"rgb(114, 114, 5)",
  "blue": "rgb(8, 8, 92)"
};


let brighten = function(color){
  let brightenNumber = 0;
  inner(color);
  function inner(color){
    brightenNumber++;
    $("#" + color).css("background-color", color);
   
    if (brightenNumber < 40){
      requestAnimationFrame(function(){
        inner(color);
      });
    }
    else{
      $("#" + color).css("background-color", darkColors[color]);
      brightenNumber = 0;
      if(colors.length > 0){
        requestAnimationFrame(function(){
          setTimeout(function(){
            inner(colors.shift());
          },500);  
        });
      }
      else if (game.currentPlayer === "computer"){
        game.currentPlayer = "user";
      }
    }
  } 
};


$(document).ready(function(){

  $("#colors").on("click","div",function(){

    if(game.currentPlayer === "user"){
      game.takeTurn();
      let color = $(this).attr("id");
      
      if(simon.matchesPosition(game.numberOfColorsClicked,color)){ 
        $("#" + color).css("background-color", color);
        setTimeout(function(){
          $("#"+color).css("background-color",darkColors[color]);
        },400);
      }
      else{
        $("#gameover span").text(simon.colorSequence.length - 1);
        $("#gameover").show();
        return;
      }
      if(game.numberOfColorsClicked === simon.colorSequence.length){
        simon.createRandomColor();
        game.reset();
        colors = [...simon.colorSequence];
        setTimeout(function(){
          brighten(colors.shift());
        },1000);
        return;
      }
    }  
  });

  $("button").click(function(){
    cleanUp();
    simon.createRandomColor();
    colors = [...simon.colorSequence];
    brighten(colors.shift())  ;
  });

});

function resetValues(){
  simon.reset();
  game.reset();
}

function cleanUp(){
  $("#gameover").hide();
  resetValues();
}



  

 


