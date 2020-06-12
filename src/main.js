import $ from 'jquery';
import 'bootstrap';
import { Simon } from './simon.js';
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
  if (redNumber < 40){
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
  }
};





let simon = new Simon();


$(document).ready(function(){

  $("body").on("click","div",)

  $("#red").click(function(){
    currentTestColorNumber++;
    if(simon.matchesPosition(currentTestColorNumber,"red")){ 
      requestAnimationFrame(red);
    }
    else{
      console.log("game over")
    }
  });

  $("#green").click(function(){
    currentTestColorNumber++;
    if(simon.matchesPosition(currentTestColorNumber,"green")){ 
      requestAnimationFrame(green);
    }
    else{
      console.log("game over")
    }
  });

  $("#yellow").click(function(){
    if(simon.matchesPosition(currentTestColorNumber,"yellow")){ 
      currentTestColorNumber++;
      requestAnimationFrame(yellow);
    }
    else{
      console.log("game over")
    }
  });

  $("#blue").click(function(){
    if(simon.matchesPosition(currentTestColorNumber,"blue")){ 
      currentTestColorNumber++;
      requestAnimationFrame(blue);
    }
    else{
      console.log("game over")
    }
  });

  $("button").click(function(){ 
    simon.createRandomColor();
    colors = simon.colorSequence;
   
    currentTestColorNumber = 0;
    requestAnimationFrame(colorFunctionObject[colors.shift()]);
  });
});
