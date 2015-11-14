'use strict';

angular.module('Tour-Track')
.controller('ProfileShowsVsYearCtrl' , ['$scope', 'Profile', function ($scope, Profile) {

	// $scope.testArr = [1,2,3]; // WORKS

	function objCreator(shows) {
		var showsVsYear = {};

		shows.forEach(function(show) {
			var year = parseInt(show.showdate.slice(0,4));
			console.log("year", typeof year, year)
			if(!showsVsYear[year]) {
				showsVsYear[year] = [];
			}
			showsVsYear[year].push(show);
		})
		return showsVsYear;
	}

	Profile.userObject().then(function(data) {
		var user = data.data;
		return user;
	}).then(function(data) {
		Profile.userShows(data.uid).then(function(data) {
			$scope.shows = data;
			$scope.showYears = (Object.keys(objCreator(data))).map(Number);
			console.log("$scope.showYears", $scope.showYears)
			$scope.testArr = [1,2,3]; // DOESN'T WORK
		})
		return data;
	})
}])