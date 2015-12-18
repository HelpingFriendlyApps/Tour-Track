'use strict';

angular.module('Tour-Track')
.controller('ProgressMapCtrl', ['$scope', 'General', function($scope, General) {

	// General.allShowsWithVenueInfo().then(function(data) {
	// 	$scope.allShows = data;
	// 	return data;
	// });

	$scope.progress = 10;

	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}


}]);