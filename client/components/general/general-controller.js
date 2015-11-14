'use strict';

angular.module('Tour-Track')
.controller('GeneralCtrl', ['$scope','$http', 'General', function($scope, $http, General) {

	$scope.getShows = function () {
		General.shows().then(function (res) {
			$scope.allShows = res.data
		});
	}

	General.shows().then(function(data) {
		$scope.shows = data;
		return data;
	})





}]);