angular.module('Tour-Track').directive('yearsPanel', function(General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/yearsPanel/yearsPanel.html',
        scope: {
        	years: '='
        },
        link: function(scope, element, attrs) {

        	scope.$watch('years', function(years) {
        		console.log('yerrrs', years)
        	})

        }
    };
});