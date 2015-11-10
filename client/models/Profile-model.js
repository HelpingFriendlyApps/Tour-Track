'use strict';

angular.module('Tour-Track')
  .factory('Profile', function($http) {

    return {
        userObject : function(){
            return $http.get('/me')
            // .success(function(data, status, headers, config) {
            //     return data;
            // })
        }
    }
});
