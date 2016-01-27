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

	$scope.clickedShowBroadcast = function() {
		$rootScope.$broadcast('showClicked');
	}

	$scope.clickedVenueBroadcast = function() {
		$rootScope.$broadcast('venueClicked');
	}

}]);