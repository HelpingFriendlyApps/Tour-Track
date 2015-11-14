'use strict';

angular.module('Tour-Track')
.controller('ProfileShowsVsYearCtrl' , ['$scope', 'Profile', 'SVY', function ($scope, Profile, SVY) {

	Profile.userObject().then(function(data) {
		var user = data.data;
		return user;
	}).then(function(data) {
		Profile.userShows(data.uid).then(function(data) {
			$scope.shows = data;
			$scope.showVsYears = SVY.arrCreator(data);
			// console.log("$scope.showVsYears", $scope.showVsYears)
		})
		return data;
	})
}])