'use strict';

angular.module('Tour-Track')
.controller('ProfileShowsVsYearCtrl' , ['$scope', 'Profile', function ($scope, Profile) {

	function arrCreator(shows) {
		var showsVsYear = [];

		shows.forEach(function(show) {
			var yearFound = false;
			var year = parseInt(show.showdate.slice(0,4));
			for (var i = 0; i < showsVsYear.length; i++) {
				if(showsVsYear[i][0] === year) {
					yearFound = true;
					showsVsYear[i][1]++;
					break;
				}
			}
			if(!yearFound) showsVsYear.push([year, 1]);
		})
		return showsVsYear;
	}
	$scope.dogs = 'dog';
	Profile.userObject().then(function(data) {
		var user = data.data;
		return user;
	}).then(function(data) {
		Profile.userShows(data.uid).then(function(data) {
			$scope.shows = data;
			$scope.showVsYears = arrCreator(data);
			// console.log("$scope.showVsYears", $scope.showVsYears)
		})
		return data;
	})
}])