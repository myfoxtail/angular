var autocomplete = angular.module('autocomplete', []);

autocomplete.directive('autocomplete', function(){
	var directiveName = 'autocomplete';
	var p = -1;
	return {
		link: function(scope, elem, attr) {
			scope.search = {
				active: true
				, suggest: {
					active: false
					, items: [
						{name: ''}
					]
				}
			};

			var fn = scope.$eval(attr[directiveName]);
			elem.bind('keyup', function(event) {
				if( event.keyCode == 13 && attr.ngModel ) {
					scope.search.suggest.active = false;
					fn(scope, attr.ngModel);
					p = -1;
				} else if( event.keyCode == 38 || event.keyCode == 40 ) {
					if( p !== -1 ) scope.search.suggest.items[p].focus = false;
					var idx = p - (39 - event.keyCode);
					if( idx < 0 ) idx = scope.search.suggest.items.length - 1;
					else if( idx > scope.search.suggest.items.length - 1) idx = 0;
					attr.ngModel = scope.search.suggest.items[idx].entity;
					scope.search.suggest.items[idx].focus = true;
					p = idx;
				} else {
					ajax({
						type: "GET",
						async: false,
						url     : '',
						success: function( msg ) {
							var str, res = [];
							try {
								str = JSON.parse(msg).res;
							} catch(e){
								str = msg.res;
							}

							for( var ii in str ) if( str.hasOwnProperty(ii) && str[ii].entity.length ) {
								res[ii] = { name: str[ii].text.replace(/&lt;/g, "<").replace(/&gt;/g, ">"), entity: str[ii].entity, focus: false };
							}
							scope.search.suggest.active = true;

							scope.$apply( function(){
								scope.search.suggest.items = res;
							});
						}
					});
				}
			});
		}
	}
});
