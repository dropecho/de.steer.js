DE.Utils.namespace("DE.Math");

DE.Math.PI = Math !== undefined ? Math.PI : 3.141592653;

DE.Math.Clamp = function(number,min,max){
	var c = Math.min(number,max); //clamp to current or max.
	return Math.max(min,c); //clamp to min or current.
};

DE.Math.Rand = function(min,max){
	return min !== undefined 
		? DE.Math.Clamp(Math.random()*max,min,max)
		: Math.random();
}

DE.Math.RadToDeg = function(radians){
	return DE.Math.CleanFloat((radians*180)/DE.Math.PI);
}

DE.Math.DegToRad = function(degrees){
	return DE.Math.CleanFloat((degrees*DE.Math.PI)/180);
}

DE.Math.CleanFloat = function(num){
	return parseFloat(num.toFixed(7));
}