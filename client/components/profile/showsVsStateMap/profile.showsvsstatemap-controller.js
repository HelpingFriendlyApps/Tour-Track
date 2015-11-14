'use strict';

angular.module('Tour-Track')
.controller('ProfileShowsVsStateMapCtrl' , ['$scope', 'Profile', 'SVS', function ($scope, Profile, SVS) {

	Profile.userObject().then(function(data) {
		var user = data.data;
		return user;
	}).then(function(data) {
		Profile.userShows(data.uid).then(function(data) {
			$scope.shows = data;
			$scope.showsVsState = SVS.showsVsStateCreator(data);
			console.log("$scope.showsVsState", $scope.showsVsState)
		})
		return data;
	})

}])