var DE = DE || {};
DE.Util = DE.Util || {};

DE.Util.Unwrap = function(val){
	return typeof val === 'function' ? val() : val;
}

DE.Util.RemoveElement = function(array,index){
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		newArray.push(array[i]);
	};

	newArray.splice(index,1);
	return newArray;
}

