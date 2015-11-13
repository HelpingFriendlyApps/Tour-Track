'use strict';

angular.module('Tour-Track')
  .controller('ProfileCtrl', ['$scope','$http', 'Profile', function($scope,$http, Profile) {
        //CURRENTLY GETS ALL SETLISTS, NEED TO PARSE SONGS AND MAKE SONG OBJECT
        $scope.getUserSongs = function(id){
            Profile.userSongs(id).then(function(x){
                $scope.allUserSongs = x.data;
            })
        }

        //CURRENTLY GETS ALL SHOWS
        $scope.getUserShows = function(id){
            Profile.userShows(id).then(function(x){
            })
        }
        //adds phish.net account details to database enabling api usage.
        $scope.submitPhishAccountDeets = function(uid){
            var phishObj = {uid: uid, phish_username: this.phishUsername, phish_password: this.phishPassword};
            Profile.addPhishAccountDetails(phishObj).then(function(data){
                $scope.shows = data.data;
            })
            this.phishUsername = '';
            this.phishPassword = '';
        }

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
