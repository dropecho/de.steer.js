var DE = DE || {};
DE.Math = DE.Math || {};

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

	Vector.prototype.Scale = function(scale){
		scale = DE.Util.Unwrap(scale) || 1;
		this.x *= scale;
		this.y *= scale;

		return this;
	};

	Vector.prototype.Add = function(vec){
		vec = DE.Util.Unwrap(vec);
		this.x += vec.x;
		this.y += vec.y;

		return this;
	};

	Vector.prototype.Sub = function(vec){
		vec = DE.Util.Unwrap(vec);
		this.x -= vec.x;
		this.y -= vec.y;

		return this;
	}

	Vector.prototype.Dot = function(vec){
		vec = DE.Util.Unwrap(vec);
		return ((this.x * vec.x) + (this.y * vec.y));
	}

	Vector.prototype.Length = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	};

	Vector.prototype.LengthSQ = function() {
		return (this.x * this.x) + (this.y * this.y);
	};

	Vector.prototype.DistanceFrom = function(vec) {
		vec = DE.Util.Unwrap(vec);
		return new Vector(this.x - vec.x,this.y - vec.y).Length();
	};

	Vector.prototype.Normalize = function(scalar) {	
		var length = this.Length();
		var normalLength = length != 0 ? (1.0 / length) : 1;
		this.x = this.x * normalLength;
		this.y = this.y * normalLength;	

		if(scalar > 0){
			this.Scale(scalar);
		}

		return this;
	};

	Vector.prototype.Perp = function() {
		return DE.Math.Vec2d(-this.y,this.x);
	};

	return Vector;
}();

//Convenience Methods
DE.Math.Vec2d = function(x,y){
	return new DE.Math.Vector(x,y);
}

DE.Math.HeadingVec = function(degrees){
	var rads = DE.Math.DegToRad(degrees);
	var x = DE.Math.CleanFloat(Math.cos(rads));
	var y = DE.Math.CleanFloat(Math.sin(rads));
	return DE.Math.Vec2d(x,y);
}

//Vector util functions.
DE.Math.Vector.Add = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	return DE.Math.Vec2d((vec1.x + vec2.x), (vec1.y + vec2.y));
};

DE.Math.Vector.Sub = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	return DE.Math.Vec2d((vec1.x - vec2.x), (vec1.y - vec2.y));
};

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

DE.Math.Vector.HeadingToDeg = function(HeadingVec){
	var world = DE.Math.Vec2d(1,0);		
	var heading = DE.Math.Vector.Normalize(HeadingVec);
	var degrees = DE.Math.RadToDeg(Math.acos(world.Dot(heading)));	
	
	//dot product returns 0 to pi, fix over 180 problems.
	if(heading.y < 0)
	{
		degrees = 360 - degrees
	}; 
	
	return degrees;
};

DE.Math.Vector.WorldToLocal = function(vec,headingVec){
	//heading vec is used as X axis in local coords
	//its perpendicular is used as the orthagonal y axis in the local coords.
	//[x1,y1]
	//[x2,y2]
	var perp = headingVec.Perp();

	var mat = [[headingVec.x,perp.x],[headingVec.y,perp.y]];
	
	var x = (vec.x * mat[0][0]) + (vec.y * mat[0][1]);
	var y = (vec.x * mat[1][0]) + (vec.y * mat[1][1]);

	return DE.Math.Vec2d(x,y);
};

DE.Math.Vector.LocalToWorld = function(vec,headingVec,pos){	
	var world = DE.Math.Vec2d(1,0);
	var degrees = DE.Math.Vector.HeadingToDeg(headingVec);
	
	var inverse = DE.Math.Vector.WorldToLocal(DE.Math.HeadingVec(-degrees),world);	
	var perp = inverse.Perp();

	var mat = [[inverse.x,perp.x],[inverse.y,perp.y]];
	var x = DE.Math.CleanFloat((vec.x * mat[0][0]) + (vec.y * mat[0][1]));
	var y = DE.Math.CleanFloat((vec.x * mat[1][0]) + (vec.y * mat[1][1]));

	return DE.Math.Vec2d(x,y).Add(pos);
};

DE.Math.Vector.MidPoint = function(vec1,vec2){
	var x = (vec1.x + vec2.x) * 0.5;
	var y = (vec1.y + vec2.y) * 0.5;
	return DE.Vec2d(x, y);
}

DE.Math.Vector.HeadingToDegTest = function(){
	for (var i = 0; i < 360; i++){
		var x = DE.Math.CleanFloat(Math.cos(DE.Math.DegToRad(i)));
		var y = DE.Math.CleanFloat(Math.sin(DE.Math.DegToRad(i)));
		var heading = DE.Math.Vec2d(x,y);
		var deg = DE.Math.Vector.HeadingToDeg(heading);
		if(deg < i - 0.0001 || deg > i + 0.0001){
			console.log("heading:",heading, "got:",deg," Expected:", i);
		}
	}
};

DE.Math.Vector.VecTest = function(){
	var test = DE.Vec2d(1,0);
	for (var i = 0; i <= 360; i+=5) {
		var local = DE.Math.Vector.WorldToLocal(test,DE.Math.HeadingVec(i));
		var world = DE.Math.Vector.LocalToWorld(local,DE.Math.HeadingVec(i),DE.Math.Vec2d(0,0));

		if(world.x < test.x - .0001 || world.x > test.x + .0001){
			console.log("AT: ",i, " Expected x to be:",test.x, "  Got:", world.x);
		}

		if(world.y < test.y - .0001 || world.y > test.y + .0001){
			console.log("AT: ",i, " Expected x to be:",test.y, "  Got:", world.y);
		}
	}
};