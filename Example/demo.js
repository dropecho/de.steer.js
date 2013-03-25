// Config
var PG_HEIGHT = 512;
var PG_WIDTH = 512;
var REFRESH_RATE = 0;
var SPEED = 10;

var KEY_LEFT  = 'A'.charCodeAt();
var KEY_RIGHT = 'D'.charCodeAt();
var KEY_UP    = 'W'.charCodeAt();
var KEY_DOWN  = 'S'.charCodeAt();

var KEY_ROT_LEFT  = 'E'.charCodeAt();
var KEY_ROT_RIGHT = 'Q'.charCodeAt();

var TILE_SIZE = 64;
var TILE_COUNT = PG_HEIGHT / TILE_SIZE;

var redCube = new $.gameQuery.Animation({ imageURL: "./v1.png"});  //media
var blueCube = new $.gameQuery.Animation({ imageURL: "./v2.png"});  //media
var grid = new $.gameQuery.Animation({ imageURL: "./grid2.png"});  //media

//helpers
var handlePlayerKeys = function(){
  var player = $("#cube"),
      keys = $.gameQuery.keyTracker;

  var trans = DE.Vec2d();
  
  if(keys[KEY_LEFT])  { trans.x -= SPEED; }
  if(keys[KEY_RIGHT]) { trans.x += SPEED; }
  if(keys[KEY_UP])    { trans.y -= SPEED; }
  if(keys[KEY_DOWN])  { trans.y += SPEED; }

  player.xy(trans,true);

  if(keys[KEY_ROT_LEFT])  { player.rotate(SPEED,true); }
  if(keys[KEY_ROT_RIGHT]) { player.rotate(-SPEED,true);}  
};

var updatePlayer = function(){
  handlePlayerKeys();

  var player = $("#cube"),
      enemy = $("#cube2"),
      playerPos = DE.Vec2d(player.xy()),
      enemyPos = DE.Vec2d(enemy.xy());
  
  
  //var flee = DE.Steer.flee(playerPos,enemyPos,1,64);
  //player.xy(flee, true);
}

var updateEnemy = function(){
  var player = $("#cube"),
      enemy = $("#cube2"),
      playerPos = DE.Vec2d(player.xy()),
      //playerPos = DE.Vec2d(64,64),
      enemyPos = DE.Vec2d(enemy.xy());

  var steering = DE.Steer.pursuit(enemyPos,playerPos,10,player.rotate());
  enemy.xy(steering, true);
};

//Main game loop.
var mainLoop = function(){  
  updatePlayer();
  updateEnemy();
};

$(document).ready(function(){
  var $playground = $("#demo");  

  $playground
    .playground({height: PG_HEIGHT, width: PG_WIDTH, refesh: REFRESH_RATE, keyTracker: true, mouseTracker: true})

    .addGroup('actors', {height: PG_HEIGHT, width: PG_WIDTH})
      .addTilemap('tileMap',function(){return 1;},grid,{width: TILE_SIZE, height: TILE_SIZE, sizex: TILE_COUNT, sizey: TILE_COUNT})
      .addSprite('cube',{animation: redCube, posx: 64, posy: 64, height:TILE_SIZE, width: TILE_SIZE})
      .addSprite('cube2',{animation: blueCube, posx: 64, posy: 128, height:TILE_SIZE, width: TILE_SIZE})
      .end()
    .registerCallback(mainLoop,REFRESH_RATE)
    .startGame();
});


