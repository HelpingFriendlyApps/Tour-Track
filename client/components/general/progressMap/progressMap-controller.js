'use strict';

angular.module('Tour-Track')
.controller('ProgressMapCtrl', ['$scope', 'General', 'ProgressMapFactory', function($scope, General, ProgressMapFactory) {

	$scope.progress = 10;

	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}

}]);