var de = de || {};
de.steer = de.steer || {};

/**	@constructor
*	@param {desteerEntity} entity
*/
de.steer.EntityBehaviors = function(){
	function EntityBehaviors(entity){
		this.entity = entity;		
		this.de_wander_target = de.Math.Vec2d(); //just makes wander easier to deal with.
	};

	return EntityBehaviors;
}();

/** @desc Converts the input vector to the entities local space
	@param {de.math.Vector} vec - The world vector.
	@returns {de.math.Vector} - The local vector.
*/
de.steer.EntityBehaviors.prototype.ToLocal = function(vec){
	return de.Math.Vector.WorldToLocal(vec,this.entity.de_heading());
};

de.steer.EntityBehaviors.prototype.Align = function(first_argument) {
	// body...
};

de.steer.EntityBehaviors.prototype.Arrive = function(targetEntity,decelForce) {
	var pos = this.entity.de_pos(),
		target_pos = targetEntity.de_pos(),
		max_speed = this.entity.de_max_speed();

	return de.steer.Behaviors.Arrive(pos, target_pos, max_speed, decelForce);
};	

de.steer.EntityBehaviors.prototype.Cohese = function(neighbors) {
	var pos = this.entity.de_pos(),
		max_speed = this.entity.de_max_speed(),
		neighborPositions = [];

	for(var i = 0, l = neighbors.length; i < l; i++){
		neighborPositions.push(neighbors.de_pos());
	}

	return de.steer.Behaviors.Cohese(pos, neighborPositions, max_speed);
};

de.steer.EntityBehaviors.prototype.Evade = function(targetEntity) {
	var pos = this.entity.de_pos(),
		max_speed = this.entity.de_max_speed(),
		target_pos = target.de_pos(),
		target_heading = target.de_heading(),
		target_vel = target.de_max_speed(); //this is not correct, but should work for now.

	return de.steer.Behaviors.Evade(pos, target_pos, max_speed, target_heading, target_vel);
};

de.steer.EntityBehaviors.prototype.Flee = function(targetEntity, fleeRadius) {
	var pos = this.entity.de_pos(),
		target_pos = target.de_pos(),
		max_speed = this.entity.de_max_speed();

	return de.steer.Behaviors.Flee(pos, target, max_speed, fleeRadius);
};

de.steer.EntityBehaviors.prototype.Hide = function(first_argument) {
	// body...
};

de.steer.EntityBehaviors.prototype.Interpose = function(first_argument) {
	// body...
};

de.steer.EntityBehaviors.prototype.ObstacleAvoid = function(first_argument) {
	// body...
};

de.steer.EntityBehaviors.prototype.Pursuit = function(targetEntity) {
	var pos = this.entity.de_pos(),
		max_speed = this.entity.de_max_speed(),
		target_pos = target.de_pos(),
		target_heading = target.de_heading(),
		target_vel = target.de_max_speed(); //this is not correct, but should work for now.

	return de.steer.Behaviors.Pursuit(pos, target_pos, max_speed, target_heading, target_vel);
};

de.steer.EntityBehaviors.prototype.Seek = function(targetEntity){
	var pos = this.entity.de_pos(),
		max_speed = this.entity.de_max_speed(),
		target = targetEntity.de_pos();

	return de.steer.Behaviors.Seek(pos, target, max_speed);
};
de.steer.EntityBehaviors.prototype.Seperation = function(neighbors) {	    
	var pos = this.entity.de_pos(),
		neighborPositions = [];

	for(var i = 0, l = neighbors.length; i < l; i++){
		neighborPositions.push(neighbors.de_pos());
	}

	return de.steer.Behaviors.Seperation(pos, neighborPositions);
};	

de.steer.EntityBehaviors.prototype.Wander = function() {
	var pos = this.entity.de_pos(),
		target = this.de_wander_target,
		heading = this.entity.de_heading();

	return de.steer.Behaviors.Wander(pos,target,heading);
};