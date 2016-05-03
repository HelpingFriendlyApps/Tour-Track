'use strict';

angular.module('Tour-Track')
  .factory('Profile', ["$http", "$sce", function($http, $sce) {

  return {
    userObject : function(){
      return $http.get('/me')
    },

    userShows : function(id){
      return $http.get('/users/shows/' + id).then(function(x){
        x.data.forEach(function(shows){
          shows.sanitizedSetList = $sce.trustAsHtml(shows.setlistdata);
        });
        return x.data;
      });
    },

    userSongs : function(id){
      return $http.get('/users/shows/songs/' + id).then(function(x){
        return x.data;
      });
    },

    addPhishAccountDetails : function(accountDetails){
      return $http.post('/users/phishNETaccount/' + accountDetails.uid, accountDetails);
    }
  }

}]);
