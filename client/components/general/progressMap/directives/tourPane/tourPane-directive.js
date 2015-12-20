angular.module('Tour-Track').directive('tourPane', function($parse, General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/tourPane/tourPane.html',
        scope: {
        	tours: '='
        },
        link: function(scope, element, attrs) {

        }
    };
});