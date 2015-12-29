'use strict'

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
            clickedVenueId: '=',
            clickedShowBroadcast: '&',
            clickedVenueBroadcast: '&'
        },
        link: function(scope, element, attrs) {

            // scope.$watch('clickedShow', function(clickedShow) {
            //     if(clickedShow) scope.clickedShowBroadcast();
            // }, true);

            scope.$watch('clickedVenueId', function(clickedVenueId) {
                console.log('clickedVenueId', clickedVenueId)
                // Taking over a minute to get here...
                if(clickedVenueId) scope.clickedVenueBroadcast();
            }, true);

        }
    };
});