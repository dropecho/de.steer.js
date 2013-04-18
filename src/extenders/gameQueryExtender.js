DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.Extenders = DE.Steer.Extenders || {};

DE.Steer.Extenders.GameQuery = function(entity,max_speed){

	entity.max_speed = max_speed || 10;

	entity.de_pos = function(){
		return DE.Math.Vec2d(entity.xy());
	};

	entity.de_heading = function(){
		return DE.Math.HeadingVec(entity.rotate());
	};

	entity.de_max_speed = function(){
		return entity.max_speed;
	};

	return entity;
};