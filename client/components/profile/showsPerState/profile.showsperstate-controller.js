'use strict';

angular.module('Tour-Track')
.controller('ProfileShowsPerState' , ['$scope', 'Profile', 'SVS', function ($scope, Profile, SVS) {
    
    Profile.userObject().then(function(data) {
        var user = data.data;
        return user;
    }).then(function(data) {
        Profile.userShows(data.uid).then(function(data) {
            $scope.shows = data;
            
            // This gets sent over
            $scope.showsPerState = SVS.showsVsStateCreator(data);
            console.log("$scope.showsPerState", $scope.showsPerState)
            console.log("$scope.showsPerState.LA", $scope.showsPerState.LA)

            $scope.profileShowStates = SVS.showStatesSorter(SVS.showStates(data));
            $scope.topXStates = SVS.topXStates;
        })
        return data;
    })
}])