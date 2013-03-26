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

	Steering.prototype.arrive = function(pos,target,speed,decelForce) {		
		decelForce = decelForce || 5;
		var distToTarget = pos.GetDistanceFrom(target);
		
		if(distToTarget > 0){	
			var arriveSpeed = distToTarget/decelForce; //Tweak wanted velocity to distance from target.
			arriveSpeed = DE.Math.Clamp(arriveSpeed,0,speed); //Clamp to maximum speed.
			return target.Sub(pos).Normalize(arriveSpeed); //Get seek vector, scale to calculated speed.
		}

		return DE.Vec2d(0,0); //dont go nowhere.
	};	

	Steering.prototype.cohese = function(pos,neighborPositions) {
		var centerOfMass = DE.Vec2d(0,0);
		var neighborCount = neighborPositions.length;

		for(var i = 0; i < neighborCount; i++){			
			centerOfMass.Add(neighborPositions[i]);
		}

		if(neighborCount > 0){					
			centerOfMass.Scale(1/neighborCount);
			return this.seek(pos,centerOfMass);			
		}

		return DE.Vec2d(0,0);
	};

	Steering.prototype.evade = function(pos,target,speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Vector.Sub(target,pos);
		var heading = DE.HeadingVec(targetHeadingDeg);			
		var targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.flee(pos,estimatedTargetPos);
	};

	Steering.prototype.flee = function(pos,target,speed,fleeRadius) {
		var shouldFlee = (fleeRadius === undefined || fleeRadius === -1 || target.GetDistanceFrom(pos) <= fleeRadius);
		
		var flee = DE.Vector.Sub(pos,target).Normalize(speed); //Get toTarget vec, scale to max speed.
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

	Steering.prototype.pursuit = function(pos,target,speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Vector.Sub(target,pos);
		var heading = DE.HeadingVec(targetHeadingDeg);			
		var targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.seek(pos,estimatedTargetPos);
	};

	Steering.prototype.seek = function(pos,target,speed) {				
		return DE.Vector.Sub(target,pos).Normalize(speed);
	};

	Steering.prototype.seperation = function(pos,neighborPositions) {
	
	    var SteeringForce = DE.Vec2d(0,0);
	    var neighborCount = neighborPositions.length;
	    
	    for(var i = 0; i < neighborCount; i++)
	    {        
	        var awayFromNeighbor = DE.Vector.Sub(pos,neighborPositions[i]);
	        var distanceToNeighbor = awayFromNeighbor.Length();
	        SteeringForce.Add(awayFromNeighbor.Normalize(1/distanceToNeighbor));    
	    }

	    return SteeringForce;

	};	

	Steering.prototype.wander = function(pos,target, HeadingVec) {
		var radius = 5;
		var dist = 10;
		var jitter = .5;

		var wanderX = DE.Math.Rand(-1,1) * jitter;
		var wanderY = DE.Math.Rand(-1,1) * jitter;
		var wanderVec = DE.Vec2d(wanderX,wanderY);
		
		target.Add(wanderVec).Normalize(radius); //Add jitter and scale to radius.
		
		var localTarget = DE.Vector.Add(target,DE.Vec2d(dist,0)); //Move X units in front of pos in local coords.
		var targetWorld = DE.Vector.LocalToWorld(target,HeadingVec, pos);		

		return DE.Vector.Sub(targetWorld,pos).Normalize(10);
	};

	return new Steering();
}();