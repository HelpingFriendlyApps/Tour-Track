'use strict';

angular.module('Tour-Track')
.controller('ProgressMapCtrl', ['$scope', 'General', 'ProgressMapFactory', function($scope, General, ProgressMapFactory) {

	$scope.progress = 0;
	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}

	$scope.currentView = 'years';
	$scope.changeView = function(view) {
		$scope.currentView = view;
	}

	$scope.dateParser = function(date) {
        return date.slice(0,10).replace(/(-)/g, '/');
    }

	ProgressMapFactory.showsPerMonth().then(function(data) {
		$scope.showsPerMonth = data;
	});

	General.allYears().then(function(data) {
		$scope.years = data;
	});

	$scope.getShowsByTour = function(tour) {
		General.allShowsWithVenueInfoByTourId(tour.id).then(function(shows) {
			$scope.filteredShows = shows;
			$scope.currentView = 'shows';
			return shows;
		});
	}





}]);