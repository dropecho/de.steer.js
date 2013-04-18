var DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.Extenders = DE.Steer.Extenders || {};

DE.Steer.Extender = function(){
	function checkExtend(entity){		
		if(entity.de_pos === undefined){
			throw new DE.Errors.ConversionError({property: "entity.de_pos", message: "is undefined. You must set the position getter in the converter."});
		}

		if(typeof entity.de_pos !== 'function'){
			throw new DE.Errors.ConversionError({property: "entity.de_pos", message: "is not a function. You must set the position getter in the converter."});	
		}

		if(entity.de_heading === undefined){
			throw new DE.Errors.ConversionError({property: "entity.de_heading", message:"is undefined. You must set the heading getter in the converter."});
		}

		if(typeof entity.de_heading !== 'function'){
			throw new DE.Errors.ConversionError({property: "entity.de_heading", message: "is not a function. You must set the heading getter in the converter."});	
		}

		if(entity.de_max_speed === undefined){
			throw new DE.Errors.ConversionError({property: "entity.de_max_speed ", message:"is undefined. You must set the max_speed getter in the converter."});
		}

		if(typeof entity.de_max_speed !== 'function'){
			throw new DE.Errors.ConversionError({property: "entity.de_max_speed", message: "is not a function. You must set the max_speed getter in the converter."});	
		}		
	};

	function Extender(){
		this.Extend = function(entity, extender) {	
			if(entity === undefined){
				throw new DE.Errors.ConversionError({property: "entity", message: "is undefined. Pass a non-null entity."});
			}

			if(entity instanceof DE.Math.Vector){
				return entity;
			}

			var extender = extender || entity.prototype && entity.prototype.constructor && entity.prototype.constructor.name;

			if(DE.Steer.Extenders[extender] === undefined){
				throw new DE.Errors.ConversionError({property: "DE.Steer.Extenders." + extender, message: "is undefined.  Register a converter for this type."})
			}

			if(DE.Steer.Extenders[extender].length < 1){
				throw new DE.Errors.ConversionError({property: "DE.Steer.Extenders." + extender, message: "must accept at least one arg, which is the entity to be converted."});
			}

			var extendedEntity = DE.Steer.Extenders[extender](entity);		
			checkExtend(extendedEntity);
			extendedEntity.Steering = new DE.Steer.EntityBehaviors(entity);
			return extendedEntity;
		};
	};

	return new Extender();
}();