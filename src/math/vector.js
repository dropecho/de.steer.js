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

