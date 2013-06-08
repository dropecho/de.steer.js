/** @namespace */
var de = de || {};

/** @namespace 
*	@memberof de
*/
de.math = de.math || {};

/** @constant 
*	@default Math.PI || 3.141592653
*	@memberof de.math
*/
de.math.PI = Math !== undefined ? Math.PI : 3.141592653;

/**	@function Clamp
*	@param {number} number 	- The number to clamp.
*	@param {number} min 	- The minimum number to output.
*	@param {number} max 	- The maximum number to output.
*
*	@returns {number} result - The clamped number.
*	@memberof de.math
*/
de.math.Clamp = function(number,min,max){
	var c = Math.min(number,max); //clamp to current or max.
	return Math.max(min,c); //clamp to min or current.
};

/** @function Rand
*	@param {number=} min 	- The minimum number to output.
*	@param {number=} max 	- The maximum number to output.
*
*	@returns {number} result - The random number, optionally clamped.
*	@memberof de.math
*/
de.math.Rand = function(min,max){
	return min !== undefined 
		? de.math.Clamp(Math.random()*max,min,max)
		: Math.random();
}


/** @function RandBool
*	@returns {bool} result - A random true or false. 
*	@memberof de.math
*/ 
de.math.RandBool = function(){
	return de.math.Rand(0,1) > .5;
}

/** @function RadToDeg
*	@desc Converts a number from radians to degrees.
* 	@param {number} radians - The number in radians.
*
* 	@returns {number} degrees - The number in degrees.
*	@memberof de.math
*/
de.math.RadToDeg = function(radians){
	return de.math.CleanFloat((radians*180)/de.math.PI);
}

/** @function DegToRad
*	@desc Converts a number from degrees to radians.
* 	@param {number} radians - The number in degrees.
*
* 	@returns {number} degrees - The number in radians.
*	@memberof de.math
*/
de.math.DegToRad = function(degrees){
	return de.math.CleanFloat((degrees*de.math.PI)/180);
}

/** @function CleanFloat
*	@desc Forces a float to fixed(7)
* 	@param {number|string} num - The number to clean, if string, its parsed into a float.
*
* 	@returns {number} degrees - Cleaned number.
*	@memberof de.math
*/
de.math.CleanFloat = function(num){
	return parseFloat(num.toFixed(7));
}