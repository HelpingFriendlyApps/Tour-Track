'use strict';

angular.module('Tour-Track')
.controller('ProgressMapCtrl', ['$scope', function($scope) {
    
	$scope.sliderConfig = {
		min: 50,
		max: 500,
		step: 1
	}

	$scope.price = 50;

	$scope.setPrice = function(price) {
		$scope.price = price;
	}

}]);