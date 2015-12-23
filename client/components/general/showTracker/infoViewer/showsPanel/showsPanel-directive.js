angular.module('Tour-Track').directive('showsPanel', function(General) {
    return {
        restrict: 'E',
        // replace: true,
        templateUrl: '../components/general/showTracker/infoViewer/showsPanel/showsPanel.html',
        scope: {
        	filteredShows: '=shows',
            currentView: '=view'
        },
        link: function(scope, element, attrs) {

            scope.$watch('filteredShows', function(filteredShows) {
                // console.log('filteredShows', filteredShows)
            })

            scope.$watch('currentView', function(currentView) {
                // console.log('currentView in show direc', currentView)
            })

        }
    };
});