'use strict';

angular.module('Tour-Track')
.controller('ToursPanelCtrl', ['$scope', 'General', function($scope, General) {

	$scope.getShowsByTour = function(tour) {
		$scope.changeView('shows')
		General.allShowsWithVenueInfoByTourId(tour.id).then(function(shows) {
			$scope.setFilteredShows(shows);
		});
	}

	console.log('$scope.currentView in tours', $scope.currentView)


}]);