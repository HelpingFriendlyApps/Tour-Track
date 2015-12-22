angular.module('Tour-Track').directive('setlistPanel', function(General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/showTracker/infoViewer/setlistPanel/setlistPanel.html',
        scope: {
        	setlist: '='
        },
        link: function(scope, element, attrs) {

        }
    };
});