DE.Utils.namespace("DE");

DE.Converter = function(){

	var checkConversion = function(entity){
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

	var convertAndCheck= function(entity){
		if(this.converter == undefined || entity instanceof DE.Vector){
			return entity;
		}
		var converted = this.converter(entity);
		checkConversion(converted);
		return converted;
	};

	function Converter(){
		this.converter = undefined;
	};

	Converter.prototype.RegisterEntityConverter = function(converterCallback) {
		if(converterCallback.length != 1){
			throw new DE.Errors.ConversionError({message: "The converter callback must take one and only one arguement, the entity to convert."});
		}
		this.converter = converterCallback;		
	};

	return new Converter();
}();