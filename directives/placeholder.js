PH = angular.module('PH', []);

PH.directive('placeholder', function(){
	// you should find out by yourself browser data and browser version
	if( browser != "Explorer" || version >= 10) return false;
	var directiveName = 'placeholder';
	return {
		link: function(scope, elm, attrs){
			var value = attrs[directiveName];
			attrs.ngModel = value;

			elm.bind('focus', function(){
				if( attrs.ngModel === value) {
					scope.$apply(function(){attrs.ngModel = ''});
				}
			});
			elm.bind('blur', function(){
				if( attrs.ngModel === '' ) {
					scope.$apply(function(){attrs.ngModel = value});
				}
			});
		}
	}
});
