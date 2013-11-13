/** @file Implementation of behaviors on entity. */

var DE = DE || {};
DE.Steer = DE.Steer || {};

/**	@constructor
*	@param {DEsteerEntity} entity
*/
DE.Steer.EntityBehaviors = function(){
	function EntityBehaviors(entity){
		this.entity = entity;		
		this.DE_wanDEr_target = DE.Math.Vec2d(); //just makes wanDEr easier to DEal with.
	};

	return EntityBehaviors;
}();

/** @DEsc Converts the input vector to the entities local space
	@param {DE.Math.Vector} vec - The world vector.
	@returns {DE.Math.Vector} - The local vector.
*/
DE.Steer.EntityBehaviors.prototype.ToLocal = function(vec){
	return DE.Math.Vector.WorldToLocal(vec,this.entity.DE_heading());
};

DE.Steer.EntityBehaviors.prototype.Align = function(first_argument) {
	// body...
};

DE.Steer.EntityBehaviors.prototype.Arrive = function(targetEntity,DEcelForce) {
	var pos = this.entity.DE_pos(),
		target_pos = targetEntity.DE_pos(),
		max_speed = this.entity.DE_max_speed();

	return DE.Steer.Behaviors.Arrive(pos, target_pos, max_speed, DEcelForce);
};	

DE.Steer.EntityBehaviors.prototype.Cohese = function(neighbors) {
	var pos = this.entity.DE_pos(),
		max_speed = this.entity.DE_max_speed(),
		neighborPositions = [];

	for(var i = 0, l = neighbors.length; i < l; i++){
		neighborPositions.push(neighbors.DE_pos());
	}

	return DE.Steer.Behaviors.Cohese(pos, neighborPositions, max_speed);
};

DE.Steer.EntityBehaviors.prototype.EvaDE = function(targetEntity) {
	var pos = this.entity.DE_pos(),
		max_speed = this.entity.DE_max_speed(),
		target_pos = target.DE_pos(),
		target_heading = target.DE_heading(),
		target_vel = target.DE_max_speed(); //this is not correct, but should work for now.

	return DE.Steer.Behaviors.EvaDE(pos, target_pos, max_speed, target_heading, target_vel);
};

DE.Steer.EntityBehaviors.prototype.Flee = function(targetEntity, fleeRadius) {
	var pos = this.entity.DE_pos(),
		target_pos = target.DE_pos(),
		max_speed = this.entity.DE_max_speed();

	return DE.Steer.Behaviors.Flee(pos, target, max_speed, fleeRadius);
};

DE.Steer.EntityBehaviors.prototype.HiDE = function(first_argument) {
	// body...
};

DE.Steer.EntityBehaviors.prototype.Interpose = function(first_argument) {
	// body...
};

DE.Steer.EntityBehaviors.prototype.ObstacleAvoid = function(first_argument) {
	// body...
};

DE.Steer.EntityBehaviors.prototype.Pursuit = function(targetEntity) {
	var pos = this.entity.DE_pos(),
		max_speed = this.entity.DE_max_speed(),
		target_pos = target.DE_pos(),
		target_heading = target.DE_heading(),
		target_vel = target.DE_max_speed(); //this is not correct, but should work for now.

	return DE.Steer.Behaviors.Pursuit(pos, target_pos, max_speed, target_heading, target_vel);
};

DE.Steer.EntityBehaviors.prototype.Seek = function(targetEntity){
	var pos = this.entity.DE_pos(),
		max_speed = this.entity.DE_max_speed(),
		target = targetEntity.DE_pos();

	return DE.Steer.Behaviors.Seek(pos, target, max_speed);
};
DE.Steer.EntityBehaviors.prototype.Seperation = function(neighbors) {	    
	var pos = this.entity.DE_pos(),
		neighborPositions = [];

	for(var i = 0, l = neighbors.length; i < l; i++){
		neighborPositions.push(neighbors.DE_pos());
	}

	return DE.Steer.Behaviors.Seperation(pos, neighborPositions);
};	

DE.Steer.EntityBehaviors.prototype.WanDEr = function() {
	var pos = this.entity.DE_pos(),
		target = this.DE_wanDEr_target,
		heading = this.entity.DE_heading();

	return DE.Steer.Behaviors.WanDEr(pos,target,heading);
};