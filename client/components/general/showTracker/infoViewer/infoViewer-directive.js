angular.module('Tour-Track').directive('infoViewer', function($parse, General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/showTracker/infoViewer/infoViewer.html',
        link: function(scope, element, attrs) {

        }
    };
});