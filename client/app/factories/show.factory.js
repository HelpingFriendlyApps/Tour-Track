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
        console.log('show', show)
        console.log('show.data', show.data)
        return show.data;
      });
    },

    getShowsByYear: function(year) {
      return $http.get('/shows/year/' + year).then(function(shows) {
        return shows.data;
      });
    },

    getShowsByVenueId: function(venueId) {
      return $http.get('/shows/venueId/' + venueId).then(function(shows) {
        return shows.data;
      });
    },

    getShowsByTourId: function(tourId) {
      return $http.get('/shows/tourId/' + tourId).then(function(shows) {
        return shows.data;
      });
    },
    
    getSetlistByShowId: function (showId) {
      return $http.get('/shows/setlist/' + showId).then(function(setlist) {
        return setlist.data;
      });
    },

    getAllShowYears: function() {
      var years = [];
      return $http.get('/tours').then(function(tours) {
        tours.data.forEach(function(tour) {
          var year = tour.starts_on.slice(0,4);
          if(years.indexOf(year) < 0) years.push(year);
        });
        return years;
      });
    }

  }

});