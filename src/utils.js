var DE = DE || {};
DE.Util = DE.Util || {};

DE.Util.Unwrap = function(val){
	return typeof val === 'function' ? val() : val;
}