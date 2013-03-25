var DE = DE || {};
DE.Steer = function(){
	function Steering(){};

	/**
    Reverse the order of the letters in a string.
    @hilite orange
 	*/
	Steering.prototype.align = function(first_argument) {
		// body...
	};

	Steering.prototype.arrive = function(pos,target,speed) {		
		var distToTarget = pos.GetDistanceFrom(target);
		if(distToTarget <= (speed * 40)){			
			if(distToTarget < 1){
				return DE.Vec2d(0,0);
			}
			var scaledSpeed = speed * ((1/(distToTarget)) - 10);			
			var newSpeed = DE.clamp(scaledSpeed,0,speed);
			console.log(newSpeed);
			return this.seek(pos,target,newSpeed);
		}
		return this.seek(pos,target,speed);
	};	

	Steering.prototype.cohese = function(first_argument) {
		// body...
	};

	Steering.prototype.evade = function(first_argument) {
		// body...
	};

	Steering.prototype.flee = function(pos,target,speed,fleeRadius) {
		var shouldFlee = (fleeRadius === undefined || fleeRadius === -1 || target.GetDistanceFrom(pos) <= fleeRadius);
		
		var flee = pos.Sub(target).Normalize(speed);
		return shouldFlee ? flee : DE.Vec2d(0,0);
	};

	Steering.prototype.hide = function(first_argument) {
		// body...
	};

	Steering.prototype.interpose = function(first_argument) {
		// body...
	};

	Steering.prototype.obstacleAvoid = function(first_argument) {
		// body...
	};

	Steering.prototype.pursuit = function(first_argument) {
		// body...
	};

	Steering.prototype.seek = function(pos,target,speed) {				
		return target.Sub(pos).Normalize(speed);
	};

	Steering.prototype.seperation = function(first_argument) {
		// body...
	};	

	Steering.prototype.wander = function(first_argument) {
		// body...
	};

	return new Steering();
}();