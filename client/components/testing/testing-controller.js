'use strict';

angular.module('Tour-Track').controller('TestingCtrl', ['$scope', 'Profile', function($scope, Profile) {
	$scope.test = 'TESTESTEST';
	// $scope.getUserShows = function(id){
 //        Profile.userShows(id).then(function(x){
 //            console.log(x);  
 //        })
 //    }
    Profile.userObject().then(function(data){ 
            var user = data.data;
            $scope.id = user.uid;
            $scope.pic = user.profilePic;
            $scope.name = user.name;
            return user;
        }).then(function(data){
            Profile.userShows(data.uid).then(function(data){
                $scope.shows = data;
            })
                return data;
        })
}]);