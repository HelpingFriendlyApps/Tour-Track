'use strict';

angular.module('Tour-Track')
.controller('ProfileShowsPerState' , ['$scope', 'Profile', 'SVY', function ($scope, Profile, SVY) {
    
    Profile.userObject().then(function(data) {
        var user = data.data;
        return user;
    }).then(function(data) {
        Profile.userShows(data.uid).then(function(data) {
            $scope.shows = data;
            $scope.allShowStates = SVS.showsVsStateCreator(data);
            $scope.profileShowStates = SVS.showStatesSorter(SVS.showStates(data));
            $scope.topXStates = SVS.topXStates;
            console.log("$scope.topXStates", $scope.topXStates(3, $scope.profileShowStates))
        })
        return data;
    })
}])