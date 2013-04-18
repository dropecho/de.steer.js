var DE = DE || {};
DE.Utils = {};
DE.Utils.namespace = function () {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = window;
        for (j = 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

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

