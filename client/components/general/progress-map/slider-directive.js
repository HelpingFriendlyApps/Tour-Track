angular.module('Tour-Track').directive('slider', function() {
    return {
        restrict: 'A',
        // replace: true,
        // template: '<div id="map"></div>',
        scope: {
            config: "=config",
            price: "=model"
        },
        link: function(scope, element, attrs) {

        	var setModel = function(value) {
        		scope.model = value;
        	}

        	$(element).slider({
                range: false,
	            min: scope.config.min,
	            max: scope.config.max,
                step: scope.config.step,
                slide: function(event, ui) { 
                    scope.$apply(function() {
                        scope.price = ui.value;
                    });
	            }
	        });



        }
    };
});