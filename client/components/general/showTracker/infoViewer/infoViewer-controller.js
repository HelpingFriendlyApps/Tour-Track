'use strict';

angular.module('Tour-Track')
.controller('InfoViewerCtrl', ['$scope', 'General', function($scope, General) {

	$scope.$parent.currentView = 'years';

	$scope.changeView = function(view) {
		var prevView = $scope.$parent.currentView;
		$scope.$parent.currentView = view;
		var filteredViews = ['years', 'tours', 'venues'];
		if(prevView === 'shows' && filteredViews.includes(view)) resetFilteredShows();
		if(prevView === 'setlist') resetCurrentShow();
	}

	function resetFilteredShows() {
		$scope.$parent.filteredShows = null;
	}

	function resetCurrentShow() {
		$scope.$parent.currentShow = null;
	}

	$scope.getShowsByTour = function(tour) {
		$scope.prevView = $scope.$parent.currentView;
		$scope.changeView('shows');
		$scope.$parent.currYearTourVenue = tour;
		General.allShowsByTourId(tour.id).then(function(shows) {
			$scope.$parent.filteredShows = shows;
		});
	}

	$scope.getShowsByVenue = function(venue) {
		$scope.prevView = $scope.$parent.currentView;
		$scope.changeView('shows');
		$scope.$parent.currYearTourVenue = venue;
		General.allShowsByVenueId(venue.id).then(function(shows) {
			$scope.$parent.filteredShows = shows;
		});
	}

	$scope.dateParser = function(date) {
		return date.slice(0,10).replace(/(-)/g, '/');
	}

	$scope.timeParser = function(ms) {
    var min = Math.floor(ms/60000);
    var sec = Math.floor(ms/1000 % 60);
    if(sec < 10) sec = '0' + sec;
    return min + ':' + sec;
}

	$scope.viewShow = function(show) {
		show = show || $scope.clickedShow;
		$scope.changeView('setlist');
		$scope.$parent.currentShow = show;
		General.setlistByShow(show.id).then(function(setlist) {
			$scope.setlist = setlist;
		});
	}

	function viewShowListByVenue() {
		console.log('$scope.clickedVenueId', $scope.clickedVenueId)
	}

	$scope.$on('showClicked', function() {
		$scope.viewShow();
	});

	$scope.$on('venueClicked', function() {
		viewShowListByVenue();
	});

}]);