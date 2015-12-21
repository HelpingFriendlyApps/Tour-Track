angular.module('Tour-Track').directive('toursPanel', function(General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/toursPanel/toursPanel.html',
        scope: {
        	tours: '='
        },
        link: function(scope, element, attrs) {

        }
    };
});