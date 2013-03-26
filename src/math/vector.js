var DE = DE || {};

DE.Vector = function(){
	function Vector(x,y){
		if(typeof DE.Util.Unwrap(x) === 'object'){			
			this.x = DE.Util.Unwrap(x.x) || 0;
			this.y = DE.Util.Unwrap(x.y) || 0;
		} else {
			this.x = DE.Util.Unwrap(x) || 0;
			this.y = DE.Util.Unwrap(y) || 0;
		}

		return this;
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

	Vector.prototype.GetDistanceFrom = function(vec) {
		vec = DE.Util.Unwrap(vec);
		return new Vector(this.x - vec.x,this.y - vec.y).Length();
	};

	Vector.prototype.Normalize = function(length) {	
		length = DE.Util.Unwrap(length);
		var normalLength = (1.0 / this.Length());
		this.x = this.x * normalLength;
		this.y = this.y * normalLength;

		this.Scale(length || 1);

		return this;
	};

	Vector.prototype.Perp = function() {
		return DE.Vec2d(-this.y,this.x);
	};

	return Vector;
}();

//Convenience Methods
DE.Vec2d = function(x,y){
	return new DE.Vector(x,y);
}

DE.HeadingVec = function(degrees){
	var rads = DE.Math.DegToRad(degrees);
	var x = DE.Math.CleanFloat(Math.cos(rads));
	var y = DE.Math.CleanFloat(Math.sin(rads));
	return DE.Vec2d(x,y);
}

//Vector util functions.
DE.Vector.Add = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	var x = vec1.x + vec2.x;
	var y = vec1.y + vec2.y;
	return DE.Vec2d(x,y);
};

DE.Vector.Sub = function(vec1,vec2){
	vec1 = DE.Util.Unwrap(vec1);
	vec2 = DE.Util.Unwrap(vec2);

	var x = vec1.x - vec2.x;
	var y = vec1.y - vec2.y;
	return DE.Vec2d(x,y);
};

DE.Vector.HeadingToDeg = function(HeadingVec){
	var world = DE.Vec2d(1,0);	
	var blah = DE.Vec2d(HeadingVec.x,HeadingVec.y);
	var degrees = DE.Math.RadToDeg(Math.acos(world.Dot(blah.Normalize())));	
	if(HeadingVec.y < 0){ degrees = 360 - degrees}; //dot product returns 0 - pi, fix over 180 problems.
	return degrees;
};

DE.Vector.WorldToLocal = function(vec,HeadingVec){
	//heading vec is used as X axis in local coords
	//its perpendicular is used as the orthagonal y axis in the local coords.
	//[x1,y1]
	//[x2,y2]
	var perp = HeadingVec.Perp();

	var mat = [[HeadingVec.x,perp.x],[HeadingVec.y,perp.y]];
	
	var x = (vec.x * mat[0][0]) + (vec.y * mat[0][1]);
	var y = (vec.x * mat[1][0]) + (vec.y * mat[1][1]);

	return DE.Vec2d(x,y);
};

DE.Vector.LocalToWorld = function(vec,HeadingVec,pos){	
	var world = DE.Vec2d(1,0);
	var degrees = DE.Vector.HeadingToDeg(HeadingVec);
	
	var inverse = DE.Vector.WorldToLocal(DE.HeadingVec(-degrees),world);	
	var perp = inverse.Perp();

	var mat = [[inverse.x,perp.x],[inverse.y,perp.y]];
	var x = DE.Math.CleanFloat((vec.x * mat[0][0]) + (vec.y * mat[0][1]));
	var y = DE.Math.CleanFloat((vec.x * mat[1][0]) + (vec.y * mat[1][1]));

	return DE.Vec2d(x,y).Add(pos);
};

DE.HeadingToDegTest = function(){
	for (var i = 0; i < 360; i++){
		var x = DE.Math.CleanFloat(Math.cos(DE.Math.DegToRad(i)));
		var y = DE.Math.CleanFloat(Math.sin(DE.Math.DegToRad(i)));
		var heading = DE.Vec2d(x,y);
		var deg = DE.Vector.HeadingToDeg(heading);
		if(deg < i - 0.0001 || deg > i + 0.0001){
			console.log("heading:",heading, "got:",deg," Expected:", i);
		}
	}
};

DE.VecTest = function(){
	var test = DE.Vec2d(1,0);
	for (var i = 0; i <= 360; i+=5) {
		var local = DE.Vector.WorldToLocal(test,DE.HeadingVec(i));
		var world = DE.Vector.LocalToWorld(local,DE.HeadingVec(i));

		if(world.x < test.x - .0001 || world.x > test.x + .0001){
			console.log("AT: ",i, " Expected x to be:",test.x, "  Got:", world.x);
		}

		if(world.y < test.y - .0001 || world.y > test.y + .0001){
			console.log("AT: ",i, " Expected x to be:",test.y, "  Got:", world.y);
		}
	}
};