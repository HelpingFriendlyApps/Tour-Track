angular.module('Tour-Track').directive('tourOrShowPanel', function($parse, General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/tourOrShowPanel/tourOrShowPanel.html',
        link: function(scope, element, attrs) {

        	scope.toursOrShows = 'tours';

        	scope.changeView = function(view) {
        		scope.toursOrShows = view;
        	}

        }
    };
});