angular.module('Tour-Track').directive('setlistPanel', function(General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/setlistPanel/setlistPanel.html',
        scope: {
        	setlist: '='
        },
        link: function(scope, element, attrs) {

        }
    };
});