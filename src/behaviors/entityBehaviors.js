var DE = DE || {};
DE.Steer = DE.Steer || {};

DE.Steer.EntityBehaviors = function(){
	function EntityBehaviors(entity){
		this.entity = entity;		
		this.de_wander_target = DE.Math.Vec2d(); //just makes wander easier to deal with.
	};

	EntityBehaviors.prototype.ToLocal = function(vec){
		return DE.Math.Vector.WorldToLocal(vec,this.entity.de_heading());
	};

	EntityBehaviors.prototype.Align = function(first_argument) {
		// body...
	};

	EntityBehaviors.prototype.Arrive = function(targetEntity,decelForce) {
		var pos = this.entity.de_pos(),
			target_pos = targetEntity.de_pos(),
			max_speed = this.entity.de_max_speed();

		return DE.Steer.Behaviors.Arrive(pos, target_pos, max_speed, decelForce);
	};	

	EntityBehaviors.prototype.Cohese = function(neighbors) {
		var pos = this.entity.de_pos(),
			max_speed = this.entity.de_max_speed(),
			neighborPositions = [];

		for(var i = 0, l = neighbors.length; i < l; i++){
			neighborPositions.push(neighbors.de_pos());
		}

		return DE.Steer.Behaviors.Cohese(pos, neighborPositions, max_speed);
	};

	EntityBehaviors.prototype.Evade = function(targetEntity) {
		var pos = this.entity.de_pos(),
			max_speed = this.entity.de_max_speed(),
			target_pos = target.de_pos(),
			target_heading = target.de_heading(),
			target_vel = target.de_max_speed(); //this is not correct, but should work for now.

		return DE.Steer.Behaviors.Evade(pos, target_pos, max_speed, target_heading, target_vel);
	};

	EntityBehaviors.prototype.Flee = function(targetEntity, fleeRadius) {
		var pos = this.entity.de_pos(),
			target_pos = target.de_pos(),
			max_speed = this.entity.de_max_speed();

		return DE.Steer.Behaviors.Flee(pos, target, max_speed, fleeRadius);
	};

	EntityBehaviors.prototype.Hide = function(first_argument) {
		// body...
	};

	EntityBehaviors.prototype.Interpose = function(first_argument) {
		// body...
	};

	EntityBehaviors.prototype.ObstacleAvoid = function(first_argument) {
		// body...
	};

	EntityBehaviors.prototype.Pursuit = function(targetEntity) {
		var pos = this.entity.de_pos(),
			max_speed = this.entity.de_max_speed(),
			target_pos = target.de_pos(),
			target_heading = target.de_heading(),
			target_vel = target.de_max_speed(); //this is not correct, but should work for now.

		return DE.Steer.Behaviors.Pursuit(pos, target_pos, max_speed, target_heading, target_vel);
	};

	EntityBehaviors.prototype.Seek = function(targetEntity){
		var pos = this.entity.de_pos(),
			max_speed = this.entity.de_max_speed(),
			target = targetEntity.de_pos();

		return DE.Steer.Behaviors.Seek(pos, target, max_speed);
	};
	EntityBehaviors.prototype.Seperation = function(neighbors) {	    
		var pos = this.entity.de_pos(),
			neighborPositions = [];

		for(var i = 0, l = neighbors.length; i < l; i++){
			neighborPositions.push(neighbors.de_pos());
		}

		return DE.Steer.Behaviors.Seperation(pos, neighborPositions);
	};	

	EntityBehaviors.prototype.Wander = function() {
		var pos = this.entity.de_pos(),
			target = this.de_wander_target,
			heading = this.entity.de_heading();

		return DE.Steer.Behaviors.Wander(pos,target,heading);
	};

	return EntityBehaviors;
}();