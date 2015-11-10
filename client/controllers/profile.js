'use strict';

angular.module('Tour-Track')
  .controller('ProfileCtrl', ['$scope','$http', 'Profile', function($scope,$http, Profile) {
    
    	Profile.userObject().then(function(data){ 
            var user = data.data;
            $scope.id = user.uid;
            $scope.pic = user.profilePic;
            $scope.name = user.name;
            return user;
        }).then(function(data){
            Profile.userShows(data.uid).then(function(data){
                console.log(data)
                $scope.shows = data.data    ;
            })
        })
}]);
