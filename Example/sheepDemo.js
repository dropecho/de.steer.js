// Config
var PG_HEIGHT = 640;
var PG_WIDTH = 800;
var REFRESH_RATE = 0;
var SPEED = 10;

var KEY_LEFT  = 'A'.charCodeAt();
var KEY_RIGHT = 'D'.charCodeAt();
var KEY_UP    = 'W'.charCodeAt();
var KEY_DOWN  = 'S'.charCodeAt();

var KEY_ROT_LEFT  = 'E'.charCodeAt();
var KEY_ROT_RIGHT = 'Q'.charCodeAt();

var TILE_SIZE = 64;
var TILE_COUNT = PG_WIDTH / TILE_SIZE;

var redCube = new $.gameQuery.Animation({ imageURL: "./v1.png"});  //media
var blueCube = new $.gameQuery.Animation({ imageURL: "./v2.png"});  //media
var grid = new $.gameQuery.Animation({ imageURL: "./grid2.png"});  //media

//helpers
var handlePlayerKeys = function(){
  var player = $("#cube"),
      keys = $.gameQuery.keyTracker;

  var trans = DE.Vec2d();
  
  //if(keys[KEY_LEFT])  { trans.y += SPEED; }
  //if(keys[KEY_RIGHT]) { trans.y -= SPEED; }
  if(keys[KEY_UP])    { trans.x += SPEED; }
  if(keys[KEY_DOWN])  { trans.x -= SPEED; }
  if(keys[KEY_LEFT])  { player.rotate(-SPEED,true); }
  if(keys[KEY_RIGHT]) { player.rotate(SPEED,true);}  

  var currentRot = DE.HeadingVec(player.rotate());
  var trans = DE.Vector.WorldToLocal(trans,currentRot);
  player.xy(trans,true);  
};



$(document).ready(function(){
  var $playground = $("#demo");  

  $playground.playground({height: PG_HEIGHT, width: PG_WIDTH, refesh: REFRESH_RATE, keyTracker: true, mouseTracker: true});
  var actors = $playground.addGroup('actors', {height: PG_HEIGHT, width: PG_WIDTH});
  actors.addTilemap('tileMap',function(){return 1;},grid,{width: TILE_SIZE, height: TILE_SIZE, sizex: TILE_COUNT, sizey: TILE_COUNT});
  actors.addSprite('cube',{animation: redCube, posx: 512, posy: 512, height:TILE_SIZE, width: TILE_SIZE}); //Add player.  

  var updatePlayer = function(){
    handlePlayerKeys();
  }

  var sheep = [];
  for( var i = 0; i < 3; i++){
    var pos = DE.Vec2d(DE.Math.Rand(0,PG_WIDTH),DE.Math.Rand(0,PG_HEIGHT));
    actors.addSprite('sheep' + i,{animation: blueCube, posx: pos.x, posy: pos.y, height:TILE_SIZE, width: TILE_SIZE});
    sheep.push($("#sheep"+i));
  }

  var updateSheep = function(){
    var player = $("#cube"),
        playerPos = DE.Vec2d(player.xy());

    var sheepPositions = [];
    for (var i = 0; i < sheep.length; i++) {
      sheepPositions.push(DE.Vec2d(sheep[i].xy()));
    };   

    for (var i = sheep.length - 1; i >= 0; i--) {      
      var sheepPos = DE.Vec2d(sheep[i].xy());
      var sheepHeading = DE.HeadingVec(sheep[i].rotate());
         
      var neighbors = DE.Util.RemoveElement(sheepPositions,i);            
      
      var steering = DE.Steer.flee(sheepPos,playerPos,10,128);
      steering.Add(DE.Steer.cohese(sheepPos,neighbors,10));
      steering.Add(DE.Steer.seperation(sheepPos,neighbors));
      
      sheep[i].rotate(DE.Vector.HeadingToDeg(steering));
      sheep[i].xy(steering, true);        
    };    
  };

  //Main game loop.
  var mainLoop = function(){  
    updatePlayer();
    updateSheep();
  };  
  
  $playground.registerCallback(mainLoop,REFRESH_RATE).startGame();
});


