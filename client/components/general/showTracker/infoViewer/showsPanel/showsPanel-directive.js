angular.module('Tour-Track').directive('showsPanel', function(General) {
    return {
        restrict: 'E',
        // replace: true,
        templateUrl: '../components/general/showTracker/infoViewer/showsPanel/showsPanel.html',
        scope: {
        	filteredShows: '=shows'
        },
        link: function(scope, element, attrs) {

            scope.$watch('filteredShows', function(filteredShows) {
                console.log('filteredShows', filteredShows)
            })

        }
    };
});