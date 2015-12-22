angular.module('Tour-Track').directive('yearsPanel', function(General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/showTracker/infoViewer/yearsPanel/yearsPanel.html',
        scope: {
        	years: '='
        },
        link: function(scope, element, attrs) {

        }
    };
});