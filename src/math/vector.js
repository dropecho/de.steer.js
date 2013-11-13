/** @file */

var DE = DE || {};
DE.Math = DE.Math || {};

/** @constructor
*	@param {number|object} x - The x component of the vector, or another object with x,y.
*	@param {number} y - The y component of the vector.
*/
DE.Math.Vector = function(){	
	function Vector(x,y){
		if(typeof DE.Util.Unwrap(x) === 'object'){			
			this.x = DE.Util.Unwrap(x.x) || 0;
			this.y = DE.Util.Unwrap(x.y) || 0;
		} else {
			this.x = DE.Util.Unwrap(x) || 0;
			this.y = DE.Util.Unwrap(y) || 0;
		}		
	};
	return Vector;
}();

/**
*	@params {number} scale - The scalar to apply to the vector.
* 	@returns {DE.Math.Vector} - 'this' vector scaled.
*/
DE.Math.Vector.prototype.Scale = function(scale){
	scale = DE.Util.Unwrap(scale) || 1;
	this.x *= scale;
	this.y *= scale;

	return this;
};

/**
*	@params {DE.Math.Vector} vec - The vector to add.
* 	@returns {DE.Math.Vector} - 'this' vector with the other adDEd.
*/
DE.Math.Vector.prototype.Add = function(vec){
	vec = DE.Util.Unwrap(vec);
	this.x += vec.x;
	this.y += vec.y;

	return this;
};

/**
*	@params {DE.Math.Vector} vec - The vector to sub.
* 	@returns {DE.Math.Vector} - 'this' vector with the other subtracted.
*/
DE.Math.Vector.prototype.Sub = function(vec){
	vec = DE.Util.Unwrap(vec);
	this.x -= vec.x;
	this.y -= vec.y;

	return this;
}

/**
*	@params {DE.Math.Vector} vec - The vector to apply the dot product to.
* 	@returns {number} - Scalar representing the dot product.
*/
DE.Math.Vector.prototype.Dot = function(vec){
	vec = DE.Util.Unwrap(vec);
	return ((this.x * vec.x) + (this.y * vec.y));
}

/**	@DEsc Get the length/mangituDE of the vector.
* 	@returns {number} - Scalar representing the length/magnituDE of the vector.
*/
DE.Math.Vector.prototype.Length = function() {
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

/**	@DEsc Get the length/mangituDE of the vector squared. This skips a sqrt.
* 	@returns {number} - Scalar representing the length/magnituDE of the vector squared.
*/
DE.Math.Vector.prototype.LengthSQ = function() {
	return (this.x * this.x) + (this.y * this.y);
};

/**	@DEsc Calculate the distance between this vector and another.
*	@params {DE.Math.Vector} vec - The vector to find distance from.
* 	@returns {number} - Scalar representing the distance.
*/
DE.Math.Vector.prototype.DistanceFrom = function(vec) {
	vec = DE.Util.Unwrap(vec);
	return new DE.Math.Vector(this.x - vec.x,this.y - vec.y).Length();
};

/** @DEsc Normalizes and optionally scales the vector.
*	@param {number} [scalar=1] - The amount to scale the normalized vector.
*	@returns {DE.Math.Vector} - this vector, normalized and scaled.
*/
DE.Math.Vector.prototype.Normalize = function(scalar) {	
	var length = this.Length();
	var normalLength = length != 0 ? (1.0 / length) : 1;
	this.x = this.x * normalLength;
	this.y = this.y * normalLength;	

	if(scalar > 0){
		this.Scale(scalar);
	}

	return this;
};

/** @DEsc Builds a perpendicular vector.
*	@returns {DE.Math.Vector} - a perpendicular vector.
*/
DE.Math.Vector.prototype.Perp = function() {
	return DE.Math.Vec2d(-this.y,this.x);
};

/** @DEsc Convenience Method to build a 2d vector.
*	@param {number|object} x - The x component of the vector, or another object with x,y.
*	@param {number} y - The y component of the vector.
*	@returns {DE.Math.Vector} - a new vector.
*/
DE.Math.Vec2d = function(x,y){
	return new DE.Math.Vector(x,y);
}

/** @DEsc Builds a vector from a DEgrees, used for game entities with only a rotation.
*	@param {number} DEgrees - The DEgrees to build a heading vector from.
*	@returns {DE.Math.Vector} - a unit vector rotated by DEgrees.
*/
DE.Math.HeadingVec = function(DEgrees){
	var rads = DE.Math.DEgToRad(DEgrees);
	var x = DE.Math.CleanFloat(Math.cos(rads));
	var y = DE.Math.CleanFloat(Math.sin(rads));
	return DE.Math.Vec2d(x,y).Normalize();
}

/** @DEsc Adds two vectors without changing either one.
*	@param {DE.Math.Vector} vec1
*	@param {DE.Math.Vector} vec2 
*	@returns {DE.Math.Vector} - a new vector representing the sum of the other two.
*/
DE.Math.Vector.Add = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	return DE.Math.Vec2d((vec1.x + vec2.x), (vec1.y + vec2.y));
};

/** @DEsc Subtracts two vectors without changing either one.
*	@param {DE.Math.Vector} vec1
*	@param {DE.Math.Vector} vec2 
*	@returns {DE.Math.Vector} - a new vector representing the difference of the other two.
*/
DE.Math.Vector.Sub = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	return DE.Math.Vec2d((vec1.x - vec2.x), (vec1.y - vec2.y));
};

/** @DEsc Build a normalized and optionally scaled form of a vector, without changing it.
*	@param {DE.Math.Vector} vec - the vector to normalize.
*	@param {number} [scalar=1] - an optional scale.
*	@returns {DE.Math.Vector} - a new vector, normalized and scaled.
*/
DE.Math.Vector.Normalize = function(vec, scalar) {
	var normalVec = DE.Math.Vec2d(vec.x,vec.y);
	var length = normalVec.Length();
	var normalLength = length != 0 ? (1.0 / length) : 1;

	normalVec.x = normalVec.x * normalLength;
	normalVec.y = normalVec.y * normalLength;

	if(scalar > 0){
		normalVec.Scale(scalar);
	}

	return normalVec;
};

/** @DEsc Converts a heading vector into a rotation in DEgrees.
*	@param {DE.Math.Vector} heading - The vector to convert to DEgrees.
*	@returns {number} DEgrees - The DEgrees representing the rotation of the vector from the world's x-axis.
*/
DE.Math.Vector.HeadingToDEg = function(heading){
	var world = DE.Math.Vec2d(1,0);		
	var normalized_heading = DE.Math.Vector.Normalize(heading);
	var DEgrees = DE.Math.RadToDEg(Math.acos(world.Dot(normalized_heading)));	
	
	//dot product returns 0 to pi, fix over 180 problems.
	if(heading.y < 0)
	{
		DEgrees = 360 - DEgrees
	}; 
	
	return DEgrees;
};

/** @DEsc Converts a vector from world space to the entities local space.
*	@param {DE.Math.Vector} vec - The vector to convert.
*	@param {DE.Math.Vector} heading - The entities heading vector.
*	@returns {DE.Math.Vector} local - The transformed vector.
*/
DE.Math.Vector.WorldToLocal = function(vec,heading){
	//heading vec is used as X axis in local coords
	//its perpendicular is used as the orthagonal y axis in the local coords.
	//[x1,y1]
	//[x2,y2]
	var perp = heading.Perp();

	var mat = [[heading.x,perp.x],[heading.y,perp.y]];
	
	var x = (vec.x * mat[0][0]) + (vec.y * mat[0][1]);
	var y = (vec.x * mat[1][0]) + (vec.y * mat[1][1]);

	return DE.Math.Vec2d(x,y);
};

/** @DEsc Transforms a vector from local space to world space.
*	@param {DE.Math.Vector} vec - The vector to convert.
*	@param {DE.Math.Vector} heading - The entities heading vector.
*	@param {DE.Math.Vector} pos - The entities position vector.
*	@returns {DE.Math.Vector} local - The transformed vector.
*/
DE.Math.Vector.LocalToWorld = function(vec, heading, pos){	
	var world = DE.Math.Vec2d(1,0);
	var DEgrees = DE.Math.DE.Math.Vector.HeadingToDEg(headingVec);
	
	var inverse = DE.Math.DE.Math.Vector.WorldToLocal(DE.Math.HeadingVec(-DEgrees),world);	
	var perp = inverse.Perp();

	var mat = [[inverse.x,perp.x],[inverse.y,perp.y]];
	var x = DE.Math.CleanFloat((vec.x * mat[0][0]) + (vec.y * mat[0][1]));
	var y = DE.Math.CleanFloat((vec.x * mat[1][0]) + (vec.y * mat[1][1]));

	return DE.Math.Vec2d(x,y).Add(pos);
};

/** @DEsc Finds the midpoint of two vectors.
*	@param {DE.Math.Vector} vec1
*	@param {DE.Math.Vector} vec2
*	@returns {DE.Math.Vector} midpoint - The midpoint of the two vectors.
*/
DE.Math.Vector.MidPoint = function(vec1,vec2){
	var x = (vec1.x + vec2.x) * 0.5;
	var y = (vec1.y + vec2.y) * 0.5;
	return DE.Vec2d(x, y);
}

DE.Math.Vector.HeadingToDEgTest = function(){
	for (var i = 0; i < 360; i++){
		var x = DE.Math.CleanFloat(Math.cos(DE.Math.DEgToRad(i)));
		var y = DE.Math.CleanFloat(Math.sin(DE.Math.DEgToRad(i)));
		var heading = DE.Math.Vec2d(x,y);
		var DEg = DE.Math.DE.Math.Vector.HeadingToDEg(heading);
		if(DEg < i - 0.0001 || DEg > i + 0.0001){
			console.log("heading:",heading, "got:",DEg," Expected:", i);
		}
	}
};

DE.Math.Vector.VecTest = function(){
	var test = DE.Vec2d(1,0);
	for (var i = 0; i <= 360; i+=5) {
		var local = DE.Math.DE.Math.Vector.WorldToLocal(test,DE.Math.HeadingVec(i));
		var world = DE.Math.DE.Math.Vector.LocalToWorld(local,DE.Math.HeadingVec(i),DE.Math.Vec2d(0,0));

		if(world.x < test.x - .0001 || world.x > test.x + .0001){
			console.log("AT: ",i, " Expected x to be:",test.x, "  Got:", world.x);
		}

		if(world.y < test.y - .0001 || world.y > test.y + .0001){
			console.log("AT: ",i, " Expected x to be:",test.y, "  Got:", world.y);
		}
	}
};