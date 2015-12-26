'use strict';

angular.module('Tour-Track')
.controller('InfoViewerCtrl', ['$scope', 'General', function($scope, General) {

	$scope.currentView = 'years';
	$scope.changeView = function(view) {
		$scope.currentView = view;
	}

	$scope.resetFilteredShows = function() {
		$scope.$parent.filteredShows = null;
	}

	$scope.resetCurrentShow = function() {
		$scope.$parent.currentShow = null;
	}

	$scope.getShowsByTour = function(tour) {
		$scope.prevTour = $scope.currentView;
		$scope.changeView('shows');
		$scope.$parent.currentTour = tour;
		$scope.currentTour = tour;
		General.allShowsWithVenueInfoByTourId(tour.id).then(function(filteredShows) {
			$scope.$parent.filteredShows = filteredShows;
		});
	}

	$scope.dateParser = function(date) {
        return date.slice(0,10).replace(/(-)/g, '/');
    }

	$scope.viewShow = function(show) {
		if(!show) show = $scope.clickedShow;
		$scope.prevView = $scope.currentView;
		$scope.changeView('setlist');
		$scope.$parent.currentShow = show;
		General.setlistByShow(show.id).then(function(setlist) {
			$scope.setlist = setlist;
		});
	}

	$scope.$on('showClicked', function() {
		$scope.viewShow();
	});

}]);