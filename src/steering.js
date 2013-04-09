var DE = DE || {};
DE.Steer = function(){
	function Steering(){		
	};

	Steering.prototype.Align = function(first_argument) {
		// body...
	};

	Steering.prototype.Arrive = function(pos,target,max_speed,decelForce) {
		decelForce = decelForce || 5;
		var distToTarget = pos.DistanceFrom(target);
		
		if(distToTarget > 0){	
			var arriveSpeed = distToTarget/decelForce; //Tweak wanted velocity to distance from target.
			arriveSpeed = DE.Math.Clamp(arriveSpeed,0,max_speed); //Clamp to maximum speed.
			return this.Seek(pos,target,arriveSpeed); //Get seek vector			
		}

		return DE.Vec2d(0,0); //dont go nowhere.
	};	

	Steering.prototype.Cohese = function(pos,neighborPositions,max_speed) {
		var centerOfMass = DE.Vec2d(0,0);
		var neighborCount = neighborPositions.length;

		for(var i = 0; i < neighborCount; i++){			
			centerOfMass.Add(neighborPositions[i]);
		}

		if(neighborCount > 0){					
			centerOfMass.Scale(1/neighborCount);
			return this.Arrive(pos,centerOfMass,max_speed);			
		}
		
		return DE.Vec2d(0,0);
	};

	Steering.prototype.Evade = function(pos,target,max_speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Vector.Sub(target,pos);
		var heading = DE.HeadingVec(targetHeadingDeg);			
		var targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.Flee(pos,estimatedTargetPos);
	};

	Steering.prototype.Flee = function(pos,target,max_speed,fleeRadius) {
		var shouldFlee =(fleeRadius === undefined || fleeRadius === -1 || target.DistanceFrom(pos) <= fleeRadius);
		
		var flee = DE.Vector.Sub(pos,target).Normalize(max_speed); //Get toTarget vec, scale to max max_speed.
		return shouldFlee ? flee : DE.Vec2d(0,0);
	};

	Steering.prototype.Hide = function(first_argument) {
		// body...
	};

	Steering.prototype.Interpose = function(first_argument) {
		// body...
	};

	Steering.prototype.ObstacleAvoid = function(first_argument) {
		// body...
	};

	Steering.prototype.Pursuit = function(pos,target,max_speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Vector.Sub(target,pos),
			heading = DE.HeadingVec(targetHeadingDeg),
			targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.Seek(pos,estimatedTargetPos);
	};

	Steering.prototype.Seek = function(pos,target,max_speed) {						
		return DE.Vector.Sub(target,pos).Normalize(max_speed);
	};

	Steering.prototype.Seperation = function(pos,neighborPositions) {	
	    var SteeringForce = DE.Vec2d(0,0),
	    	neighborCount = neighborPositions.length;
	    
	    for(var i = 0; i < neighborCount; i++)
	    {        
	        var awayFromNeighbor = DE.Vector.Sub(pos,neighborPositions[i]);
	        var distanceToNeighbor = awayFromNeighbor.Length();
	        SteeringForce.Add(awayFromNeighbor.Normalize(128/distanceToNeighbor));    
	    }

	    return SteeringForce;

	};	

	Steering.prototype.Wander = function(pos,target, HeadingVec) {
		var radius = 1,
			dist = 10,
			jitter = 1;

		var wanderx = DE.Math.Rand(-1,1);
		var wandery = DE.Math.Rand(-1,1);
		var wanderVec = DE.Vec2d(wanderx,wandery).Normalize();
		
		target.Add(wanderVec).Normalize(radius); //Add jitter and scale to radius.
		
		var localTarget = DE.Vector.Add(target,DE.Vec2d(dist,0)); //Move X units in front of pos in local coords.
		var targetWorld = DE.Vector.LocalToWorld(localTarget,HeadingVec, pos);

		return DE.Steer.Seek(pos,targetWorld,1);		
	};

	return new Steering();
}();