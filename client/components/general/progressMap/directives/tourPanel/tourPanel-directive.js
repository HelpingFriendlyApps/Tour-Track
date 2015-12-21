angular.module('Tour-Track').directive('tourPanel', function($parse, General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/tourPanel/tourPanel.html',
        scope: {
        	tours: '='
        },
        link: function(scope, element, attrs) {

        }
    };
});