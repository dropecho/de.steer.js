var de = de || {};
de.math = de.math || {};

/** @constructor
*	@param {number|object} x - The x component of the vector, or another object with x,y.
*	@param {number} y - The y component of the vector.
*/
de.math.Vector = function(){	
	function Vector(x,y){
		if(typeof DE.Util.Unwrap(x) === 'object'){			
			this.x = DE.Util.Unwrap(x.x) || 0;
			this.y = DE.Util.Unwrap(x.y) || 0;
		} else {
			this.x = DE.Util.Unwrap(x) || 0;
			this.y = DE.Util.Unwrap(y) || 0;
		}		
	};
	return de.math.Vector;
}();

/**
*	@params {number} scale - The scalar to apply to the vector.
* 	@returns {de.math.Vector} - 'this' vector scaled.
*/
de.math.Vector.prototype.Scale = function(scale){
	scale = DE.Util.Unwrap(scale) || 1;
	this.x *= scale;
	this.y *= scale;

	return this;
};

/**
*	@params {de.math.Vector} vec - The vector to add.
* 	@returns {de.math.Vector} - 'this' vector with the other added.
*/
de.math.Vector.prototype.Add = function(vec){
	vec = DE.Util.Unwrap(vec);
	this.x += vec.x;
	this.y += vec.y;

	return this;
};

/**
*	@params {de.math.Vector} vec - The vector to sub.
* 	@returns {de.math.Vector} - 'this' vector with the other subtracted.
*/
de.math.Vector.prototype.Sub = function(vec){
	vec = DE.Util.Unwrap(vec);
	this.x -= vec.x;
	this.y -= vec.y;

	return this;
}

/**
*	@params {de.math.Vector} vec - The vector to apply the dot product to.
* 	@returns {number} - Scalar representing the dot product.
*/
de.math.Vector.prototype.Dot = function(vec){
	vec = DE.Util.Unwrap(vec);
	return ((this.x * vec.x) + (this.y * vec.y));
}

/**	@desc Get the length/mangitude of the vector.
* 	@returns {number} - Scalar representing the length/magnitude of the vector.
*/
de.math.Vector.prototype.Length = function() {
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

/**	@desc Get the length/mangitude of the vector squared. This skips a sqrt.
* 	@returns {number} - Scalar representing the length/magnitude of the vector squared.
*/
de.math.Vector.prototype.LengthSQ = function() {
	return (this.x * this.x) + (this.y * this.y);
};

/**	@desc Calculate the distance between this vector and another.
*	@params {de.math.Vector} vec - The vector to find distance from.
* 	@returns {number} - Scalar representing the distance.
*/
de.math.Vector.prototype.DistanceFrom = function(vec) {
	vec = DE.Util.Unwrap(vec);
	return new de.math.Vector(this.x - vec.x,this.y - vec.y).Length();
};

/** @desc Normalizes and optionally scales the vector.
*	@param {number} [scalar=1] - The amount to scale the normalized vector.
*	@returns {de.math.Vector} - this vector, normalized and scaled.
*/
de.math.Vector.prototype.Normalize = function(scalar) {	
	var length = this.Length();
	var normalLength = length != 0 ? (1.0 / length) : 1;
	this.x = this.x * normalLength;
	this.y = this.y * normalLength;	

	if(scalar > 0){
		this.Scale(scalar);
	}

	return this;
};

/** @desc Builds a perpendicular vector.
*	@returns {de.math.Vector} - a perpendicular vector.
*/
de.math.Vector.prototype.Perp = function() {
	return de.math.Vec2d(-this.y,this.x);
};

//Convenience Methods
de.math.Vec2d = function(x,y){
	return new de.math.de.math.Vector(x,y);
}

de.math.HeadingVec = function(degrees){
	var rads = de.math.DegToRad(degrees);
	var x = de.math.CleanFloat(Math.cos(rads));
	var y = de.math.CleanFloat(Math.sin(rads));
	return de.math.Vec2d(x,y);
}

//de.math.Vector util functions.
de.math.Vector.Add = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	return de.math.Vec2d((vec1.x + vec2.x), (vec1.y + vec2.y));
};

de.math.Vector.Sub = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	return de.math.Vec2d((vec1.x - vec2.x), (vec1.y - vec2.y));
};

de.math.Vector.Normalize = function(vec, scalar) {
	var normalVec = de.math.Vec2d(vec.x,vec.y);
	var length = normalVec.Length();
	var normalLength = length != 0 ? (1.0 / length) : 1;

	normalVec.x = normalVec.x * normalLength;
	normalVec.y = normalVec.y * normalLength;

	if(scalar > 0){
		normalVec.Scale(scalar);
	}

	return normalVec;
};

de.math.Vector.HeadingToDeg = function(HeadingVec){
	var world = de.math.Vec2d(1,0);		
	var heading = de.math.de.math.Vector.Normalize(HeadingVec);
	var degrees = de.math.RadToDeg(Math.acos(world.Dot(heading)));	
	
	//dot product returns 0 to pi, fix over 180 problems.
	if(heading.y < 0)
	{
		degrees = 360 - degrees
	}; 
	
	return degrees;
};

de.math.Vector.WorldToLocal = function(vec,headingVec){
	//heading vec is used as X axis in local coords
	//its perpendicular is used as the orthagonal y axis in the local coords.
	//[x1,y1]
	//[x2,y2]
	var perp = headingVec.Perp();

	var mat = [[headingVec.x,perp.x],[headingVec.y,perp.y]];
	
	var x = (vec.x * mat[0][0]) + (vec.y * mat[0][1]);
	var y = (vec.x * mat[1][0]) + (vec.y * mat[1][1]);

	return de.math.Vec2d(x,y);
};

de.math.Vector.LocalToWorld = function(vec,headingVec,pos){	
	var world = de.math.Vec2d(1,0);
	var degrees = de.math.de.math.Vector.HeadingToDeg(headingVec);
	
	var inverse = de.math.de.math.Vector.WorldToLocal(de.math.HeadingVec(-degrees),world);	
	var perp = inverse.Perp();

	var mat = [[inverse.x,perp.x],[inverse.y,perp.y]];
	var x = de.math.CleanFloat((vec.x * mat[0][0]) + (vec.y * mat[0][1]));
	var y = de.math.CleanFloat((vec.x * mat[1][0]) + (vec.y * mat[1][1]));

	return de.math.Vec2d(x,y).Add(pos);
};

de.math.Vector.MidPoint = function(vec1,vec2){
	var x = (vec1.x + vec2.x) * 0.5;
	var y = (vec1.y + vec2.y) * 0.5;
	return DE.Vec2d(x, y);
}

de.math.Vector.HeadingToDegTest = function(){
	for (var i = 0; i < 360; i++){
		var x = de.math.CleanFloat(Math.cos(de.math.DegToRad(i)));
		var y = de.math.CleanFloat(Math.sin(de.math.DegToRad(i)));
		var heading = de.math.Vec2d(x,y);
		var deg = de.math.de.math.Vector.HeadingToDeg(heading);
		if(deg < i - 0.0001 || deg > i + 0.0001){
			console.log("heading:",heading, "got:",deg," Expected:", i);
		}
	}
};

de.math.Vector.VecTest = function(){
	var test = DE.Vec2d(1,0);
	for (var i = 0; i <= 360; i+=5) {
		var local = de.math.de.math.Vector.WorldToLocal(test,de.math.HeadingVec(i));
		var world = de.math.de.math.Vector.LocalToWorld(local,de.math.HeadingVec(i),de.math.Vec2d(0,0));

		if(world.x < test.x - .0001 || world.x > test.x + .0001){
			console.log("AT: ",i, " Expected x to be:",test.x, "  Got:", world.x);
		}

		if(world.y < test.y - .0001 || world.y > test.y + .0001){
			console.log("AT: ",i, " Expected x to be:",test.y, "  Got:", world.y);
		}
	}
};