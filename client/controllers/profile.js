'use strict';

angular.module('Tour-Track')
  .controller('ProfileCtrl', ['$scope','$http', 'Profile', function($scope,$http, Profile) {
    
    	Profile.userObject().then(function(data){ 
            var user = data.data;
            console.log(user)
            $scope.id = user.uid;
            $scope.pic = user.profilePic
            $scope.name = user.name;
        });
}]);
