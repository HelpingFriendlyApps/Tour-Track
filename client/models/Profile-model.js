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
                return x;
            })
        }
    }
});
