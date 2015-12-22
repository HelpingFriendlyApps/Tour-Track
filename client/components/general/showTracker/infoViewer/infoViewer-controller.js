'use strict';

angular.module('Tour-Track')
.controller('InfoViewerCtrl', ['$scope', 'General', function($scope, General) {

	$scope.currentView = 'years';
	$scope.changeView = function(view) {
		console.log('view', view)
		$scope.currentView = view;
	}

	$scope.getCurrentView = function() {
		return $scope.currentView;
	}

    $scope.setFilteredShows = function(shows) {
	    $scope.filteredShows = shows;
    }

    $scope.setCurrentSetlist = function(show) {
    	$scope.changeView('setlist')
	    $scope.currSetlist = ['a','b','c'];
    }


}]);