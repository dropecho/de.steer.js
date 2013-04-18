var DE = DE || {};
DE.Steer = DE.Steer || {};

DE.Steer.EntityBehaviors = function(){
	function EntityBehaviors(entity){
		this.entity = entity;				
	};

	EntityBehaviors.prototype.ToLocal = function(vec){
		return DE.Math.Vector.WorldToLocal(vec,this.entity.de_heading());
	};

	EntityBehaviors.prototype.Seek = function(targetEntity){
		var pos = this.entity.de_pos(),
			max_speed = this.entity.de_max_speed(),
			target = targetEntity.de_pos();

		return DE.Steer.Behaviors.Seek(pos, target, max_speed);
	};

	return EntityBehaviors;
}();