// Config
var PG_HEIGHT = 512;
var PG_WIDTH = 512;
var REFRESH_RATE = 30;
var SPEED = 5;

var updatePlayer = function(){  
  if($.gameQuery.keyTracker[65]){ //left
    $("#cube").x(-SPEED,true);    
  }
  if($.gameQuery.keyTracker[68]){ //right
    $("#cube").x(SPEED,true);
  }
  if($.gameQuery.keyTracker[87]){ //up
    $("#cube").y(-SPEED,true);    
  }
  if($.gameQuery.keyTracker[83]){ //down
    $("#cube").y(SPEED,true);
  }

  //rotate
  if($.gameQuery.keyTracker[69]){ //down
    $("#cube").scale(SPEED,true);
  }
  if($.gameQuery.keyTracker[81]){ //down
   $("#cube").scale(-SPEED,true);
  }  
};


var mainLoop = function(){
  //console.log("test");  
  //$("#cube").xy(1,1,true); 
  updatePlayer();
};

$(document).ready(function(){
  var $playground = $("#demo");
  
  var cube = new $.gameQuery.Animation({ imageURL: "./v1.png"});

  $playground
    .playground({height: PG_HEIGHT, width: PG_WIDTH, refesh: REFRESH_RATE, keyTracker: true})
    .addGroup('actors', {height: PG_HEIGHT, width: PG_WIDTH})
      .addSprite('cube',{animation: cube, posx: 0, posy: 0, height:64, width: 64})
      .end()
    .registerCallback(mainLoop, REFRESH_RATE)
    .startGame();
});


