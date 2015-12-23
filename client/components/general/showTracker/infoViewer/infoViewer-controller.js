'use strict';

angular.module('Tour-Track')
.controller('InfoViewerCtrl', ['$scope', 'General', function($scope, General) {

	$scope.currentView = 'years';
	$scope.changeView = function(view) {
		$scope.currentView = view;
	}

	$scope.getCurrentView = function() {
		return $scope.currentView;
	}

	// console.log('$scope.shows', $scope.shows)
	// console.log('$scope.tours', $scope.tours)
	// console.log('$scope.years', $scope.years)

	console.log('test', $scope.test)

    // $scope.setFilteredShows = function(shows) {
	   //  $scope.filteredShows = shows;
    // }

    // $scope.setCurrentSetlist = function(show) {
    // 	$scope.changeView('setlist')
	   //  $scope.currSetlist = ['a','b','c'];
    // }


}]);