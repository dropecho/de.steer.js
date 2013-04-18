// Config
var PG_HEIGHT = 768;
var PG_WIDTH = 1024;
var REFRESH_RATE = 0;
var SPEED = 10;

var KEY_LEFT  = 'A'.charCodeAt();
var KEY_RIGHT = 'D'.charCodeAt();
var KEY_UP    = 'W'.charCodeAt();
var KEY_DOWN  = 'S'.charCodeAt();

var KEY_ROT_LEFT  = 'E'.charCodeAt();
var KEY_ROT_RIGHT = 'Q'.charCodeAt();

var TILE_SIZE = 16;
var SPRITE_SIZE = 16;
var TILE_COUNT_X = PG_WIDTH / (TILE_SIZE*4);
var TILE_COUNT_Y = PG_HEIGHT / (TILE_SIZE*4);

var redCube = new $.gameQuery.Animation({ imageURL: "./v1-small.png"});  //media
var blueCube = new $.gameQuery.Animation({ imageURL: "./v2-small.png"});  //media
var grid = new $.gameQuery.Animation({ imageURL: "./grid2.png"});  //media

//helpers
var player, enemy;
var target = DE.Math.Vec2d(0,0);

var handlePlayerKeys = function(){
  var keys = $.gameQuery.keyTracker;

  var trans = DE.Math.Vec2d();

  if(keys[KEY_UP])    { trans.x += SPEED; }
  if(keys[KEY_DOWN])  { trans.x -= SPEED; }
  if(keys[KEY_LEFT])  { player.rotate(-SPEED,true); }
  if(keys[KEY_RIGHT]) { player.rotate(SPEED,true);}  
    
  player.xy(player.Steering.ToLocal(trans),true);    
};

var initEntities = function(){  
  player = DE.Steer.Extender.Extend($("#player"),"GameQuery");
  enemy = DE.Steer.Extender.Extend($("#enemy"),"GameQuery");

  enemy.max_speed = 5;
};

var updatePlayer = function(){
  handlePlayerKeys();
}

var updateEnemy = function(){  
  var desiredVel = enemy.Steering.Seek(player);

  enemy.rotate(DE.Math.Vector.HeadingToDeg(desiredVel));
  enemy.xy(desiredVel,true);  
};

//Main game loop.
var mainLoop = function(){  
  updatePlayer();
  updateEnemy();
};

$(document).ready(function(){
  var $playground = $("#demo");  

  $playground
    .playground({height: PG_HEIGHT, width: PG_WIDTH, refesh: REFRESH_RATE, keyTracker: true})
    .addGroup('actors', {height: PG_HEIGHT, width: PG_WIDTH})
      .addTilemap('tileMap',function(){return 1;},grid,{width: TILE_SIZE*4, height: TILE_SIZE*4, sizex: TILE_COUNT_X, sizey: TILE_COUNT_Y})
      .addSprite('player',{animation: redCube, posx: 512, posy: 512, height:SPRITE_SIZE, width: SPRITE_SIZE})
      .addSprite('enemy',{animation: blueCube, posx: 512, posy: 512, height:SPRITE_SIZE, width: SPRITE_SIZE})
      .end()
    .registerCallback(mainLoop,REFRESH_RATE)
    .startGame();
    initEntities();
});


