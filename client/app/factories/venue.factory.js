'use strict';

angular.module('Tour-Track')
.factory('VenueFactory', function($http, $sce) {

  return {

    getAllVenues: function () {
      return $http.get('/venues').then(function(venues) {
        return venues.data;
      });
    },

    getVenueById: function (id) {
      return $http.get('/venues/' + id).then(function(venue) {
        return venue.data;
      });
    }

  }

});