'use strict';

angular.module('Tour-Track')
.controller('GeneralLayoutTree' , ['$scope', 'General', 'GeneralLayoutTreeFactory', function ($scope, General, GeneralLayoutTreeFactory) {

	General.allShows().then(function(data) {
		$scope.shows = data;
		return data;
	}).then(function () {
		General.allSongs().then(function(data) {
			$scope.songs = data;
			return data;
		}).then(function () {
			General.allTours().then(function(tours) {
				$scope.tours = tours;
				return tours;
			}).then(function(tours) {
				$scope.years = General.allYears(tours);
				$scope.layoutTreeObject = GeneralLayoutTreeFactory.treeObjCreator($scope.years, $scope.tours, $scope.shows, $scope.songs)
			});
		});
	});

}]);