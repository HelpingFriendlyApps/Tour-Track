'use strict';

angular.module('Tour-Track')
  .factory('Profile', function($http) {

    return {

        userObject : function(){
            return $http.get('/me')
        },

        userShows : function(id){
            console.log(id)
            return $http.get('/users/shows/' + id);
        }
    }
});
