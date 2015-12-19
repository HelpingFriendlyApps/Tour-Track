'use strict';

angular.module('Tour-Track')
.controller('ProgressMapCtrl', ['$scope', 'General', function($scope, General) {

	$scope.progress = 10;

	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}

}]);