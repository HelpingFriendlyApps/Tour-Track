angular.module('Tour-Track').directive('toursPanel', function(General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/showTracker/infoViewer/toursPanel/toursPanel.html',
        // scope: {
        // 	tours: '='
        // },
        link: function(scope, element, attrs) {

        }
    };
});