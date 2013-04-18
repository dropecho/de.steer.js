var DE = DE || {};
DE.Steer = DE.Steer || {};

DE.Steer.Extender = function(){
	var checkExtend = function(entity){
		if(entity.pos == undefined){
			throw new DE.Errors.ConversionError({property: "entity.pos", message: " is undefined. You must set the position vector in the converter."});
		}
		if(entity.heading == undefined){
			throw new DE.Errors.ConversionError({property: "entity.heading", message:" is undefined. You must set the heading vector in the converter."});
		}
		if(entity.max_speed == undefined){
			throw new DE.Errors.ConversionError({property: "entity.max_speed ", message:"is undefined. You must set the max_speed scalar in the converter."});
		}		
	};

	function Extender(){};

	Extender.prototype.extend = function(entity) {		
		if(entity instanceof DE.Vector){
			return entity;
		}

		var root = entity.prototype.constructor.name;
		if(DE.Steer.Extenders[root] === undefined){
			throw new DE.Errors.ConversionError({property: "DE.Steer.Extenders." + root, message: "is undefined.  Register a converter for this type."})
		}

		
		var converted = this.converter(entity);
		checkConversion(converted);
		return converted;
	};

	return new Extender();
}();