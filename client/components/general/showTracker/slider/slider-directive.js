angular.module('Tour-Track').directive('slider', function() {
    return {
        restrict: 'A',
        scope: {
            config: "=config",
            progress: "=model",
            shows: "="
        },
        link: function(scope, element, attrs) {

        	var setModel = function(value) {
        		scope.model = value;
        	}

        	scope.$watch('shows', function(shows) {
        		if(shows) {

		        	$(element).slider({
		                range: false,
			            min: 0,
			            max: shows.length,
		                step: 1,
		                slide: function(event, ui) { 
		                    scope.$apply(function() {
		                        scope.progress = ui.value;
		                    });
			            }
			        });
        			
        		}
        	})




        }
    };
});