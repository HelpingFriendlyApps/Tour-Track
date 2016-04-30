angular.module('Tour-Track')
.factory('CredsFactory', ["$http", "$sce", function($http, $sce) {

  return {

    getMapBoxToken: function(){
        return $http.get("/creds/mapboxToken").then(function(token) {
            return token.data;
        });
    }
  }

}]);