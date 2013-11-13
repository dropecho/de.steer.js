var DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.Extenders = DE.Steer.Extenders || {};

DE.Steer.Extenders.GameQuery = function(entity,max_speed){

	entity.max_speed = max_speed || 10;

	entity.DE_pos = function(){
		return DE.Math.Vec2d(entity.xy());
	};

	entity.DE_heading = function(){
		return DE.Math.HeadingVec(entity.rotate());
	};

	entity.DE_max_speed = function(){
		return entity.max_speed;
	};

	return entity;
};