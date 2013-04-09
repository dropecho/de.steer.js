DE = DE||{};
DE.Errors = {};

DE.Errors.ConversionError = function(opts){
	this.name = "ConversionError";
	this.message = opts.message || "Unknown Error.";
	this.property = opts.property + " " || "";
	this.toString = function(){
		return this.name + ": " + this.property + this.message;
	}		
};
