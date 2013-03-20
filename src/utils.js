var DE = DE || {};

DE.clamp = function(number,min,max){
	return Math.max(min,Math.min(number,max));
};

DE.rand = function(min,max){
	return min !== undefined 
		? DE.clamp(Math.random(),min,max)
		: Math.random();
}

DE.unwrap = function(val){
	return typeof val === 'function' ? val() : val;
}
