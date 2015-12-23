angular.module('Tour-Track').directive('infoViewer', function($parse, General) {
    return {
        restrict: 'E',
        templateUrl: '../components/general/showTracker/infoViewer/infoViewer.html',
        scope: {
        	shows: '=',
        	tours: '=',
        	years: '=',
            currentShow: '='
        },
        link: function(scope, element, attrs) {


        }
    };
});