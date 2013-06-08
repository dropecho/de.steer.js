var de = de || {};
de.steer = de.steer || {};

/**	@constructor */
de.steer.Behaviors = function(){
	function Behaviors(){				
	};
	return Behaviors;
}();

/** 
*	@desc Builds a force to align to the average heading of the neighbors.
*	@param {de.math.Vector} headingVec - The entities heading vector.
*	@param {Array<de.math.Vector>} neighborHeadings - Heading vectors of the entities neighbors.
*	@returns {de.math.Vector} - steering force.
*/
de.steer.Behaviors.prototype.Align = function(headingVec, neighborHeadings) {		
	var averageHeading = DE.Math.Vec2d(); 
	var neighborCount = neighborHeadings.length; 
	
	for(var i = 0; i < neighborCount; ++i){
		averageHeading.Add(neighborHeadings[i]);
	}
	
	if(neighborCount > 0){
		averageHeading.Scale(1/neighborCount);
		averageHeading.Sub(headingVec);
	}

	return averageHeading;
};

/** 
*	@desc Builds a force to arrive at the target position.
*	@param {de.math.Vector} pos 			- The entities position.
*	@param {de.math.Vector} target 			- The targets position.
*	@param {number} max_speed 		- The entities max_speed.
*	@param {number} [decelForce=5]	- A tweakable value that effects the speed the entity will slow.
*	@returns {de.math.Vector} - steering force.
*/
de.steer.Behaviors.prototype.Arrive = function(pos,target,max_speed,decelForce) {
	decelForce = decelForce || 5;
	var distToTarget = pos.DistanceFrom(target);
	
	if(distToTarget > 0){	
		var arriveSpeed = distToTarget/decelForce; //Tweak wanted velocity to distance from target.
		arriveSpeed = DE.Math.Clamp(arriveSpeed,0,max_speed); //Clamp to maximum speed.
		return this.Seek(pos,target,arriveSpeed); //Get seek vector			
	}

	return DE.Math.Vec2d(0,0); //dont go nowhere.
};	

/** 
*	@desc Builds a force to move to the center of mass of the entities neighbors.
*	@param {de.math.Vector} pos - The entities position.
*	@param {Array<de.math.Vector>} neighborPositions - Position vectors of the entities neighbors.
*	@param {number} max_speed 		- The entities max_speed.
*	@returns {de.math.Vector} - steering force.
*/
de.steer.Behaviors.prototype.Cohese = function(pos,neighborPositions,max_speed) {
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

/** 
*	@desc Builds a force to flee from the target.
*	@param {de.math.Vector} pos 	- The entities position.
*	@param {de.math.Vector} target 	- The targets position.
*	@param {number} max_speed 		- The entities max_speed.
*	@param {de.math.Vector} targetHeadingDeg 	- The targets heading vector.
*	@param {de.math.Vector} targetCurrentSpeed 	- The targets current speed.
*	@returns {de.math.Vector} 		- steering force.
*/
de.steer.Behaviors.prototype.Evade = function(pos,target,max_speed,targetHeadingDeg, targetCurrentSpeed) {
	var toTarget = DE.Math.Vector.Sub(target,pos);
	var heading = DE.Math.HeadingVec(targetHeadingDeg);			
	var targetCurrentSpeed = targetCurrentSpeed || 60;

	var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);		
	var estimatedTargetPos = DE.Math.Vector.Add(target,heading.Normalize(lookAhead));
	
	return this.Flee(pos,estimatedTargetPos);
};

/** 
*	@desc Builds a force to flee from the target.
*	@param {de.math.Vector} pos 	- The entities position.
*	@param {de.math.Vector} target 	- The targets position.
*	@param {number} max_speed 		- The entities max_speed.
*	@param {number} [fleeRadius=-1]	- The radius which triggers a flee response.
*	@returns {de.math.Vector} 		- steering force.
*/
de.steer.Behaviors.prototype.Flee = function(pos,target,max_speed,fleeRadius) {
	var shouldFlee =(fleeRadius === undefined || fleeRadius === -1 || target.DistanceFrom(pos) <= fleeRadius);
	
	var flee = DE.Math.Vector.Sub(pos,target).Normalize(max_speed); //Get toTarget vec, scale to max max_speed.
	return shouldFlee ? flee : DE.Math.Vec2d(0,0);
};

de.steer.Behaviors.prototype.Hide = function(first_argument) {
	// body...
};

/** 
*	@desc Builds a force to move to the midpoint of a line intersecting both targets.
*	@param {de.math.Vector} pos 		- The entities position.
*	@param {de.math.Vector} target_1 	- The targets position.
*	@param {de.math.Vector} target_2 	- The targets position.
*	@param {number} max_speed 			- The entities max_speed.
*	@returns {de.math.Vector} 			- steering force.
*/
de.steer.Behaviors.prototype.Interpose = function(pos, target_1, target_2, max_speed) {		
	var midpoint = DE.Math.Vector.MidPoint(target_1,target_2);
	return Arrive(pos, midpoint, max_speed);
};

de.steer.Behaviors.prototype.ObstacleAvoid = function(first_argument) {
	// body...
};

/** 
*	@desc Builds a force to move to the target, taking the targets heading and speed into account.
*	@param {de.math.Vector} pos 	- The entities position.
*	@param {de.math.Vector} target 	- The targets position.
*	@param {number} max_speed 		- The entities max_speed.
*	@returns {de.math.Vector} 		- steering force.
*/
de.steer.Behaviors.prototype.Pursuit = function(pos, target, max_speed, targetHeading, targetCurrentSpeed) {
	var toTarget = DE.Math.Vector.Sub(target,pos),
		heading = (targetHeading instanceof DE.Math.Vector) ? targetHeading : DE.Math.HeadingVec(targetHeadingDeg),
		targetCurrentSpeed = targetCurrentSpeed || 60;

	var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);		
	var estimatedTargetPos = DE.Math.Vector.Add(target,heading.Normalize(lookAhead));
	
	return this.Seek(pos,estimatedTargetPos);
};

/** 
*	@desc Builds a force to move to target.
*	@param {de.math.Vector} pos 	- The entities position.
*	@param {de.math.Vector} target 	- The targets position.
*	@param {number} max_speed 		- The entities max_speed.
*	@returns {de.math.Vector} 		- steering force.
*/
de.steer.Behaviors.prototype.Seek = function(pos, target, max_speed) {						
	return DE.Math.Vector.Sub(target,pos).Normalize(max_speed);
};

/** 
*	@desc Builds a force to stay seperated from the entities neighbors.
*	@param {de.math.Vector} pos 			- The entities position.
*	@param {Array<de.math.Vector>} target 	- The targets position.
*	@returns {de.math.Vector} 				- steering force.
*/
de.steer.Behaviors.prototype.Seperation = function(pos, neighborPositions) {	
    var seperationForce = DE.Math.Vec2d(0,0),
    	neighborCount = neighborPositions.length;
    
    for(var i = 0; i < neighborCount; i++)
    {        
        var awayFromNeighbor = DE.Math.Vector.Sub(pos,neighborPositions[i]);
        var distanceToNeighbor = awayFromNeighbor.Length();
        seperationForce.Add(awayFromNeighbor.Normalize(128/distanceToNeighbor));    
    }

    return seperationForce;
};	

/** 
*	@desc Builds a force to stay seperated from the entities neighbors.
*	@param {de.math.Vector} pos 	- The entities position.
*	@param {de.math.Vector} target 	- The wander target, this is a ref.
*	@param {de.math.Vector} headingVec 	- The entities heading vector.
*	@returns {de.math.Vector} 		- steering force.
*/
de.steer.Behaviors.prototype.Wander = function(pos, target, headingVec) {
	var radius = 1,
		dist = 10,
		jitter = 1;

	var wanderx = DE.Math.Rand(-1,1);
	var wandery = DE.Math.Rand(-1,1);
	var wanderVec = DE.Math.Vec2d(wanderx,wandery).Normalize();
	
	target.Add(wanderVec).Normalize(radius); //Add jitter and scale to radius.
	
	var localTarget = DE.Math.Vector.Add(target,DE.Math.Vec2d(dist,0)); //Move X units in front of pos in local coords.
	var targetWorld = DE.Math.Vector.LocalToWorld(localTarget, headingVec, pos);

	return this.Seek(pos,targetWorld,1);		
};