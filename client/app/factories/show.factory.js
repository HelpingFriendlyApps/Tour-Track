'use strict';

angular.module('Tour-Track')
.factory('ShowFactory', function($http, $sce) {

  return {

    getAllShows: function() {
      return $http.get('/shows').then(function(shows) {
        return shows.data;
      });
    },

    getShowById: function(showId) {
      return $http.get('/shows/' + showId).then(function(show) {
        return show.data;
      });
    }

  }

});