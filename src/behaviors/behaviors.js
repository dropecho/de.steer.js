var DE = DE || {};
DE.Steer = DE.Steer || {};

DE.Steer.Behaviors = function(){
	function Behaviors(){				
	};

	Behaviors.prototype.Align = function(first_argument) {
		// body...
	};

	Behaviors.prototype.Arrive = function(pos,target,max_speed,decelForce) {
		decelForce = decelForce || 5;
		var distToTarget = pos.DistanceFrom(target);
		
		if(distToTarget > 0){	
			var arriveSpeed = distToTarget/decelForce; //Tweak wanted velocity to distance from target.
			arriveSpeed = DE.Math.Clamp(arriveSpeed,0,max_speed); //Clamp to maximum speed.
			return this.Seek(pos,target,arriveSpeed); //Get seek vector			
		}

		return DE.Math.Vec2d(0,0); //dont go nowhere.
	};	

	Behaviors.prototype.Cohese = function(pos,neighborPositions,max_speed) {
		var centerOfMass = DE.Math.Vec2d(0,0);
		var neighborCount = neighborPositions.length;

		for(var i = 0; i < neighborCount; i++){			
			centerOfMass.Add(neighborPositions[i]);
		}

		if(neighborCount > 0){					
			centerOfMass.Scale(1/neighborCount);
			return this.Arrive(pos,centerOfMass,max_speed);			
		}
		
		return DE.Math.Vec2d(0,0);
	};

	Behaviors.prototype.Evade = function(pos,target,max_speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Math.Vector.Sub(target,pos);
		var heading = DE.Math.HeadingVec(targetHeadingDeg);			
		var targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Math.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.Flee(pos,estimatedTargetPos);
	};

	Behaviors.prototype.Flee = function(pos,target,max_speed,fleeRadius) {
		var shouldFlee =(fleeRadius === undefined || fleeRadius === -1 || target.DistanceFrom(pos) <= fleeRadius);
		
		var flee = DE.Math.Vector.Sub(pos,target).Normalize(max_speed); //Get toTarget vec, scale to max max_speed.
		return shouldFlee ? flee : DE.Math.Vec2d(0,0);
	};

	Behaviors.prototype.Hide = function(first_argument) {
		// body...
	};

	Behaviors.prototype.Interpose = function(first_argument) {
		// body...
	};

	Behaviors.prototype.ObstacleAvoid = function(first_argument) {
		// body...
	};

	Behaviors.prototype.Pursuit = function(pos,target,max_speed,targetHeadingDeg, targetCurrentSpeed) {
		var toTarget = DE.Math.Vector.Sub(target,pos),
			heading = DE.Math.HeadingVec(targetHeadingDeg),
			targetCurrentSpeed = targetCurrentSpeed || 60;

		var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);		
		var estimatedTargetPos = DE.Math.Vector.Add(target,heading.Normalize(lookAhead));
		
		return this.Seek(pos,estimatedTargetPos);
	};

	Behaviors.prototype.Seek = function(pos,target,max_speed) {						
		return DE.Math.Vector.Sub(target,pos).Normalize(max_speed);
	};

	Behaviors.prototype.Seperation = function(pos,neighborPositions) {	
	    var BehaviorsForce = DE.Math.Vec2d(0,0),
	    	neighborCount = neighborPositions.length;
	    
	    for(var i = 0; i < neighborCount; i++)
	    {        
	        var awayFromNeighbor = DE.Math.Vector.Sub(pos,neighborPositions[i]);
	        var distanceToNeighbor = awayFromNeighbor.Length();
	        BehaviorsForce.Add(awayFromNeighbor.Normalize(128/distanceToNeighbor));    
	    }

	    return BehaviorsForce;

	};	

	Behaviors.prototype.Wander = function(pos,target, HeadingVec) {
		var radius = 1,
			dist = 10,
			jitter = 1;

		var wanderx = DE.Math.Rand(-1,1);
		var wandery = DE.Math.Rand(-1,1);
		var wanderVec = DE.Math.Vec2d(wanderx,wandery).Normalize();
		
		target.Add(wanderVec).Normalize(radius); //Add jitter and scale to radius.
		
		var localTarget = DE.Math.Vector.Add(target,DE.Math.Vec2d(dist,0)); //Move X units in front of pos in local coords.
		var targetWorld = DE.Math.Vector.LocalToWorld(localTarget,HeadingVec, pos);

		return this.Seek(pos,targetWorld,1);		
	};

	return new Behaviors();
}();