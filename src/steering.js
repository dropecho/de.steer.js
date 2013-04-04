var DE = DE || {};
DE.Steer = function(){
	function Steering(){};

	Steering.prototype.Align = function(first_argument) {
		// body...
	};

	Steering.prototype.Arrive = function(pos,target,speed,decelForce) {		
		decelForce = decelForce || 5;
		var distToTarget = pos.DistanceFrom(target);
		
		if(distToTarget > 0){	
			var arriveSpeed = distToTarget/decelForce; //Tweak wanted velocity to distance from target.
			arriveSpeed = DE.Math.Clamp(arriveSpeed,0,speed); //Clamp to maximum speed.
			return this.Seek(pos,target,arriveSpeed); //Get seek vector			
		}

		return DE.Vec2d(0,0); //dont go nowhere.
	};	

	Steering.prototype.Cohese = function(pos,neighborPositions,speed) {
		var centerOfMass = DE.Vec2d(0,0);
		var neighborCount = neighborPositions.length;

		for(var i = 0; i < neighborCount; i++){			
			centerOfMass.Add(neighborPositions[i]);
		}

		if(neighborCount > 0){					
			centerOfMass.Scale(1/neighborCount);
			return this.Seek(pos,centerOfMass,speed);			
		}

		return DE.Vec2d(0,0);
	};

	Steering.prototype.Evade = function(pos,target,speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Vector.Sub(target,pos);
		var heading = DE.HeadingVec(targetHeadingDeg);			
		var targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.Flee(pos,estimatedTargetPos);
	};

	Steering.prototype.Flee = function(pos,target,speed,fleeRadius) {
		var shouldFlee = true;//(fleeRadius === undefined || fleeRadius === -1 || target.GetDistanceFrom(pos) <= fleeRadius);
		
		var flee = DE.Vector.Sub(pos,target).Normalize(speed); //Get toTarget vec, scale to max speed.
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

	Steering.prototype.Pursuit = function(pos,target,speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Vector.Sub(target,pos),
			heading = DE.HeadingVec(targetHeadingDeg),
			targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.Seek(pos,estimatedTargetPos);
	};

	Steering.prototype.Seek = function(pos,target,speed) {						
		return DE.Vector.Sub(target,pos).Normalize(speed);
	};

	Steering.prototype.Seperation = function(pos,neighborPositions) {	
	    var SteeringForce = DE.Vec2d(0,0),
	    	neighborCount = neighborPositions.length;
	    
	    for(var i = 0; i < neighborCount; i++)
	    {        
	        var awayFromNeighbor = DE.Vector.Sub(pos,neighborPositions[i]);
	        var distanceToNeighbor = awayFromNeighbor.Length();
	        SteeringForce.Add(awayFromNeighbor.Normalize(64/distanceToNeighbor));    
	    }

	    return SteeringForce;

	};	

	Steering.prototype.Wander = function(pos,target, HeadingVec) {
		var radius = 5,
			dist = 10,
			jitter = .5;

		var wanderX = DE.Math.Rand(-1,1) * jitter;
		var wanderY = DE.Math.Rand(-1,1) * jitter;
		var wanderVec = DE.Vec2d(wanderX,wanderY);
		
		target.Add(wanderVec).Normalize(radius); //Add jitter and scale to radius.
		
		var localTarget = DE.Vector.Add(target,DE.Vec2d(dist,0)); //Move X units in front of pos in local coords.
		var targetWorld = DE.Vector.LocalToWorld(target,HeadingVec, pos);		

		return DE.Steer.Seek(pos,targetWorld,10);		
	};

	return new Steering();
}();