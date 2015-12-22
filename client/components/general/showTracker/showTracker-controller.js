'use strict';

angular.module('Tour-Track')
.controller('ShowTrackerCtrl', ['$scope', '$rootScope', 'General', 'ShowTrackerFactory', function($scope, $rootScope, General, ShowTrackerFactory) {

	$scope.progress = 0;
	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}

	$scope.currentView = 'years';
	$scope.changeView = function(view) {
		$scope.currentView = view;
	}

	$scope.getCurrentView = function() {
		return $scope.currentView;
	}

	$scope.dateParser = function(date) {
        return date.slice(0,10).replace(/(-)/g, '/');
    }

	ShowTrackerFactory.showsPerMonth().then(function(data) {
		$scope.showsPerMonth = data;
	});

	General.allYears().then(function(data) {
		$scope.years = data;
	});

	$scope.getShowsByTour = function(tour) {
		$scope.changeView('shows')
		General.allShowsWithVenueInfoByTourId(tour.id).then(function(shows) {
			$scope.filteredShows = shows;
		});
	}

	$scope.getSetlist = function(show) {
		$scope.changeView('setlist')
		General.setlistByShow(show.id).then(function(setlist) {
			$scope.currSetlist = setlist;
			console.log('$scope.currSetlist', $scope.currSetlist)
			// $rootScope.currSetlist = setlist;
		});
	}





}]);