// Config
var PG_HEIGHT = 512;
var PG_WIDTH = 512;
var REFRESH_RATE = 30;
var SPEED = 5;

var KEY_LEFT  = 'A'.charCodeAt();
var KEY_RIGHT = 'D'.charCodeAt();
var KEY_UP    = 'W'.charCodeAt();
var KEY_DOWN  = 'S'.charCodeAt();

var KEY_ROT_LEFT  = 'E'.charCodeAt();
var KEY_ROT_RIGHT = 'Q'.charCodeAt();

var updatePlayer = function(){  
  var p = $("#cube"),
      keys = $.gameQuery.keyTracker,
      mouse = $.gameQuery.mouseTracker;

  if(keys[KEY_LEFT])  { p.x(-SPEED,true); }
  if(keys[KEY_RIGHT]) { p.x(SPEED,true);  }
  if(keys[KEY_UP])    { p.y(-SPEED,true); }
  if(keys[KEY_DOWN])  { p.y(SPEED,true);  }

  //rotate
  if(keys[KEY_ROT_LEFT])  { p.rotate(SPEED,true); }
  if(keys[KEY_ROT_RIGHT]) { p.rotate(-SPEED,true);}

  var seekResult = DE.Steer.flee(new DE.utils.Vector(p.x(),p.y()),new DE.utils.Vector(mouse.x,mouse.y),2);  
  p.xy(seekResult.x,seekResult.y, true);
};

var mainLoop = function(){  
  updatePlayer();
};

$(document).ready(function(){
  var $playground = $("#demo");

  var cube = new $.gameQuery.Animation({ imageURL: "./v1.png"});

  $playground
    .playground({height: PG_HEIGHT, width: PG_WIDTH, refesh: REFRESH_RATE, keyTracker: true, mouseTracker: true})
    .addGroup('actors', {height: PG_HEIGHT, width: PG_WIDTH})
      .addSprite('cube',{animation: cube, posx: 64, posy: 64, height:64, width: 64})
      .end()
    .registerCallback(mainLoop,REFRESH_RATE)
    .startGame();
});


