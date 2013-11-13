
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
  //var desiredVel = enemy.Steering.Wander();

  //enemy.rotate(DE.Math.Vector.HeadingToDeg(desiredVel));
  //enemy.xy(desiredVel,true);  
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


