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
