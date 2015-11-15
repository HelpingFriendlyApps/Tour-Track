'use strict';

angular.module('Tour-Track')
.controller('GeneralCtrl', ['$scope','$http', 'General', function($scope, $http, General) {

	General.allShows().then(function(data) {
		$scope.shows = data;
		return data;
	});

	General.allSongs().then(function(data) {
		$scope.songs = data;
		return data;
	});

}]);