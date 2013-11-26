/** @namespace */
var DE = DE || {};

/** @namespace 
*	@memberof DE
*/
DE.Math = DE.Math || {};

/** @constant 
*	@DEfault Math.PI || 3.141592653
*	@memberof DE.Math
*/
DE.Math.PI = Math !== undefined ? Math.PI : 3.141592653;

/**	@function Clamp
*	@param {number} number 	- The number to clamp.
*	@param {number} min 	- The minimum number to output.
*	@param {number} max 	- The maximum number to output.
*
*	@returns {number} result - The clamped number.
*	@memberof DE.Math
*/
DE.Math.Clamp = function(number,min,max){
	var c = Math.min(number,max); //clamp to current or max.
	return Math.max(min,c); //clamp to min or current.
};

/** @function Rand
*	@param {number=} min 	- The minimum number to output.
*	@param {number=} max 	- The maximum number to output.
*
*	@returns {number} result - The random number, optionally clamped.
*	@memberof DE.Math
*/
DE.Math.Rand = function(min,max){
	return min !== undefined 
		? DE.Math.Clamp(Math.random()*max,min,max)
		: Math.random();
}


/** @function RandBool
*	@returns {bool} result - A random true or false. 
*	@memberof DE.Math
*/ 
DE.Math.RandBool = function(){
	return DE.Math.Rand(0,1) > .5;
}

/** @function RadToDEg
*	@DEsc Converts a number from radians to DEgrees.
* 	@param {number} radians - The number in radians.
*
* 	@returns {number} DEgrees - The number in DEgrees.
*	@memberof DE.Math
*/
DE.Math.RadToDeg = function(radians){
	return DE.Math.CleanFloat((radians*180)/DE.Math.PI);
}

/** @function DEgToRad
*	@DEsc Converts a number from DEgrees to radians.
* 	@param {number} radians - The number in DEgrees.
*
* 	@returns {number} DEgrees - The number in radians.
*	@memberof DE.Math
*/
DE.Math.DegToRad = function(DEgrees){
	return DE.Math.CleanFloat((DEgrees*DE.Math.PI)/180);
}

/** @function CleanFloat
*	@DEsc Forces a float to fixed(7)
* 	@param {number|string} num - The number to clean, if string, its parsed into a float.
*
* 	@returns {number} DEgrees - Cleaned number.
*	@memberof DE.Math
*/
DE.Math.CleanFloat = function(num){
	return parseFloat(num.toFixed(7));
}