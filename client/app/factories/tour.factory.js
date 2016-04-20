'use strict';

angular.module('Tour-Track')
.factory('TourFactory', function($http, $sce) {

  return {

    getAllTours: function () {
      return $http.get('/tours').then(function(tours) {
        return tours.data;
      });
    },

    getTourById: function (id) {
      return $http.get('/tours/' + id).then(function(tour) {
        return tour.data;
      });
    }

  }

});