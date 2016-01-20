'use strict';

angular.module('Tour-Track')
.controller('ShowTrackerCtrl', ['$scope', '$rootScope', 'General', 'ShowTrackerFactory', function($scope, $rootScope, General, ShowTrackerFactory) {

	$scope.progress = 0;
	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}

	ShowTrackerFactory.showsPerMonth().then(function(data) {
		$scope.showsPerMonth = data;
	});
	
	$scope.madeUpVal = 0;
	$scope.doItDude = function() {
		console.log('deed it')
		$scope.madeUpVal += 10;
	}

	$scope.venueShowCount = {}
	$scope.$watch('shows', function(shows) {
		shows.forEach(function(show) {
			$scope.venueShowCount[show.venue_id] = $scope.venueShowCount[show.venue_id] || [];
			$scope.venueShowCount[show.venue_id].push(show)
		});
		console.log('$scope.venueShowCount[408]', $scope.venueShowCount['408'])
		console.log('showTracker controller SHOWS', shows)
	})

	// General.allShows().then(function(data) {
	// 	$scope.shows = data;
	// });

	// General.allTours().then(function(data) {
	// 	$scope.tours = data;
	// });

	// General.allVenues().then(function(data) {
	// 	$scope.venues = data;
	// });

	// General.allYears().then(function(data) {
	// 	$scope.years = data;
	// });


	$scope.clickedShowBroadcast = function() {
		$rootScope.$broadcast('showClicked');
	}

	$scope.clickedVenueBroadcast = function() {
		console.log('inside broadcast')
		$rootScope.$broadcast('venueClicked');
	}


}]);