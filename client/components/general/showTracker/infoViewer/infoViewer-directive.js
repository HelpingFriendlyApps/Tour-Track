angular.module('Tour-Track').directive('infoViewer', function(General) {
    return {
        restrict: 'E',
        templateUrl: '../components/general/showTracker/infoViewer/infoViewer.html',
        scope: {
        	shows: '=',
        	tours: '=',
            venues: '=',
        	years: '=',
            currentShow: '=',
            filteredShows: '=',
            clickedShow: '=',
            clickedShowBroadcast: '&'
        },
        link: function(scope, element, attrs) {

            scope.$watch('clickedShow', function(clickedShow) {
                if(clickedShow) scope.clickedShowBroadcast();
            }, true);

        }
    };
});