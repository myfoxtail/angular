/*
 * This code is useful for other events like blur, focus, etc.
*/

PH = angular.module('PH', []);

PH..directive('ngKeypress', function(){
	var directiveName = 'ngKeypress';
	return function(scope, element, attr) {
		var fn = scope.$eval(attr[directiveName]);
		element.bind('keyup', function(event) {
			scope.$apply(function() {
				fn(scope, {$event:event});
			});
		});
	};
});
