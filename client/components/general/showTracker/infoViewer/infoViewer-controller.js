'use strict';

angular.module('Tour-Track')
.controller('InfoViewerCtrl', ['$scope', 'General', function($scope, General) {

	$scope.$parent.currentView = 'years';
	console.log('$scope.$parent.currentView', $scope.$parent.currentView)

	$scope.changeView = function(view) {
		$scope.$parent.currentView = view;
	}

	$scope.resetFilteredShows = function() {
		$scope.$parent.filteredShows = null;
	}

	$scope.resetCurrentShow = function() {
		$scope.$parent.currentShow = null;
	}

	$scope.getShowsByTour = function(tour) {
		$scope.prevView = $scope.$parent.currentView;
		$scope.changeView('shows');
		$scope.$parent.currYearTourVenue = tour;
		General.allShowsByTourId(tour.id).then(function(shows) {
			console.log('shows', shows)
			$scope.$parent.filteredShows = shows;
		});
	}

	$scope.getShowsByVenue = function(venue) {
		$scope.prevView = $scope.$parent.currentView;
		$scope.changeView('shows');
		$scope.$parent.currYearTourVenue = venue;
		General.allShowsByVenueId(venue.id).then(function(shows) {
			console.log('shows', shows)
			$scope.$parent.filteredShows = shows;
		});
	}

	$scope.dateParser = function(date) {
        return date.slice(0,10).replace(/(-)/g, '/');
    }

	$scope.viewShow = function(show) {
		show = show || $scope.clickedShow;
		// $scope.prevView = $scope.$parent.currentView;
		$scope.changeView('setlist');
		$scope.$parent.currentShow = show;
		General.setlistByShow(show.id).then(function(setlist) {
			$scope.setlist = setlist;
		});
	}

	function viewShowListByVenue() {
		console.log('i deed it')
		console.log('$scope.clickedVenueId', $scope.clickedVenueId)
	}

	$scope.$on('showClicked', function() {
		$scope.viewShow();
	});

	$scope.$on('venueClicked', function() {
		viewShowListByVenue();
	});

}]);