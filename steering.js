var DE = DE || {};
DE.Steer = function(){

	function Steering(){};

	Steering.prototype.seek = function(pos,target,speed) {				
		return target.Sub(pos).Normalize(speed);
	};

	Steering.prototype.flee = function(pos,target,speed,fleeRadius) {
		var shouldFlee = (fleeRadius === undefined || fleeRadius == -1 || target.GetDistanceFrom(pos) <= fleeRadius);
		
		var flee = pos.Sub(target).Normalize(speed);
		return shouldFlee ? flee : DE.Vec2d(0,0);
	};

	return new Steering();
}();