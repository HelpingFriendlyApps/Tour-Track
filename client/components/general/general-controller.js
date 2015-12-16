'use strict';

angular.module('Tour-Track')
.controller('GeneralCtrl', ['$scope','$http', 'General','Profile', function($scope, $http, General, Profile) {

	General.allShows().then(function(data) {
		$scope.shows = data;
		return data;
	});

	General.allShowsWithVenueInfo().then(function(data) {
		$scope.showsWithVenueInfo = data;
		return data;
	})

	General.allSongs().then(function(data) {
		$scope.songs = data;
		return data;
	});

	General.allTours().then(function(data) {
		$scope.tours = data;
		return data;
	});

	General.allVenues().then(function(data) {
		$scope.venues = data;
		return data;
	});

	Profile.userObject().then(function(data){ 
        var user = data.data;
        $scope.id = user.uid;
        $scope.pic = user.profilePic;
        $scope.name = user.name;
        return user;
    })


}]);