'use strict';

angular.module('Tour-Track')
.controller('ShowTrackerCtrl', ['$scope', 'General', 'ShowTrackerFactory', function($scope, General, ShowTrackerFactory) {

	$scope.progress = 0;
	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}

	ShowTrackerFactory.showsPerMonth().then(function(data) {
		$scope.showsPerMonth = data;
	});

	General.allShows().then(function(data) {
		$scope.shows = data;
		// console.log('$scope.shows', $scope.shows)
	});

	General.allTours().then(function(data) {
		$scope.tours = data;
		// console.log('$scope.tours', $scope.tours)
	});

	General.allYears().then(function(data) {
		$scope.years = data;
		// console.log('$scope.years', $scope.years)
	});


}]);