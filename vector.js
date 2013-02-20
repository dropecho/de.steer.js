var DE = DE || {};

DE.Vector = function(){
	function Vector(x,y){
		if(typeof DE.unwrap(x) === 'object'){			
			this.x = DE.unwrap(x.x) || 0;
			this.y = DE.unwrap(x.y) || 0;
		} else {
			this.x = DE.unwrap(x) || 0;
			this.y = DE.unwrap(y) || 0;
		}

		return this;
	};

	Vector.prototype.Scale = function(scale){
		scale = DE.unwrap(scale) || 1;
		this.x *= scale;
		this.y *= scale;

		return this;
	};

	Vector.prototype.Add = function(vec){
		vec = DE.unwrap(vec);
		this.x += vec.x;
		this.y += vec.y;

		return this;
	};

	Vector.prototype.Sub = function(vec){
		vec = DE.unwrap(vec);
		this.x -= vec.x;
		this.y -= vec.y;

		return this;
	}

	Vector.prototype.Dot = function(vec){
		vec = DE.unwrap(vec);
		return ((this.x * vec.x) + (this.y * vec.y));
	}

	Vector.prototype.Length = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	};

	Vector.prototype.LengthSQ = function() {
		return (this.x * this.x) + (this.y * this.y);
	};

	Vector.prototype.GetDistanceFrom = function(vec) {
		vec = DE.unwrap(vec);
		return new Vector(this.x - vec.x,this.y - vec.y).Length();
	};

	Vector.prototype.Normalize = function(length) {	
		length = DE.unwrap(length);
		var normalLength = (1.0 / this.Length());
		this.x = this.x * normalLength;
		this.y = this.y * normalLength;

		this.Scale(length || 1);

		return this;
	};

	return Vector;
}();

DE.Vec2d = function(x,y){
	return new DE.Vector(x,y);
}