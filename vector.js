function Vector(x,y){
	if(typeof x === 'object'){
		this.x = x.x || 0;
		this.y = x.y || 0;
	} else {
		this.x = x || 0;
		this.y = y || 0;
	}

	return this;
};

Vector.prototype.Scale = function(scale){
	this.x *= scale;
	this.y *= scale;

	return this;
};

Vector.prototype.Add = function(vec){
	this.x += vec.x;
	this.y += vec.y;

	return this;
};

Vector.prototype.Sub = function(vec){
	this.x -= vec.x;
	this.y -= vec.y;

	return this;
}

Vector.prototype.Dot = function(vec){
	return ((this.x * vec.x) + (this.y * vec.y));
}

Vector.prototype.Length = function() {
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

Vector.prototype.LengthSQ = function() {
	return (this.x * this.x) + (this.y * this.y);
};

Vector.prototype.Normalize = function() {	
	var normalLength = (1.0 / this.Length());
	this.x = this.x * normalLength;
	this.y = this.y * normalLength;

	return this;
};