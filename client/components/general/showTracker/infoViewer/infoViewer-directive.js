angular.module('Tour-Track').directive('infoViewer', function($parse, General) {
    return {
        restrict: 'E',
        // replace: true,
        templateUrl: '../components/general/showTracker/infoViewer/infoViewer.html',
        scope: {
        	shows: '=',
        	tours: '=',
        	years: '='
        },
        link: function(scope, element, attrs) {

        	scope.$watch('shows', function(shows) {
        		console.log('shows', shows)
        		scope.test = shows;
        	});

        	scope.$watch('tours', function(tours) {
        		// console.log('tours', tours)
        	});

        	scope.$watch('years', function(years) {
        		// console.log('years', years)
        	});

        }
    };
});