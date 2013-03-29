// Config
var PG_HEIGHT = 1024;
var PG_WIDTH = 1600;
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
var TILE_COUNT = PG_WIDTH / TILE_SIZE;

var redCube = new $.gameQuery.Animation({ imageURL: "./v1-small.png"});  //media
var blueCube = new $.gameQuery.Animation({ imageURL: "./v2-small.png"});  //media
var grid = new $.gameQuery.Animation({ imageURL: "./grid-small.png"});  //media

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

var updatePlayer = function(){
  handlePlayerKeys();

  var player = $("#cube"),
      enemy = $("#cube2"),
      playerPos = DE.Vec2d(player.xy()),
      enemyPos = DE.Vec2d(enemy.xy());
  
  
  //var flee = DE.Steer.flee(playerPos,enemyPos,1,64);
  //player.xy(flee, true);
}

var enemyWander = DE.Vec2d(0,0);
var enemyHeading = DE.Vec2d(1,0);

var updateEnemy = function(){
  var player = $("#cube"),
      enemy = $("#cube2"),
      playerPos = DE.Vec2d(player.xy()),
      //playerPos = DE.Vec2d(64,64),
      enemyPos = DE.Vec2d(enemy.xy());

  
  enemyHeading = DE.HeadingVec(enemy.rotate());
  
  //var steering = DE.Steer.wander(enemyPos,enemyWander,enemyHeading);
  var steering = DE.Steer.arrive(enemyPos,playerPos,8,10);
  enemy.rotate(DE.Vector.HeadingToDeg(steering));
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
      .addSprite('cube',{animation: redCube, posx: 512, posy: 512, height:SPRITE_SIZE, width: SPRITE_SIZE})
      .addSprite('cube2',{animation: blueCube, posx: 512, posy: 512, height:SPRITE_SIZE, width: SPRITE_SIZE})
      .end()
    .registerCallback(mainLoop,REFRESH_RATE)
    .startGame();
});


