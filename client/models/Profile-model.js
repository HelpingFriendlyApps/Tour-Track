'use strict';

angular.module('Tour-Track')
  .factory('Profile', function($http, $sce) {

    return {
        userObject : function(){
            return $http.get('/me')
        },

        userShows : function(id){
            return $http.get('/users/shows/' + id).then(function(x){
                x.data.forEach(function(shows){
                    shows.sanitizedSetList = $sce.trustAsHtml(shows.setlistdata);
                })
                return x.data;
            })
        },

        userSongs : function(id){
            return $http.get('/users/shows/songs/' + id).then(function(x){
                return x.data.map(function(shows){
                    var parsedShows = JSON.parse(shows);
                    parsedShows[0].sanitizedSetList = $sce.trustAsHtml(parsedShows[0].setlistdata);
                    return parsedShows[0];
                })
            })
        }
    }
});
