var DE = DE || {};
DE.Steer = function(){

	function Steering(){};

	Steering.prototype.seek = function(pos,target,speed) {
		return target.Sub(pos).Normalize(speed);
	};

	Steering.prototype.flee = function(pos,target,speed,fleeRadius) {
		var shouldFlee = (fleeRadius === undefined || fleeRadius == -1 || target.GetDistanceFrom(pos) <= fleeRadius);
		
		return shouldFlee ? pos.Sub(target).Normalize(speed) : new DE.Vector(0,0);
	};

	return new Steering();
}();