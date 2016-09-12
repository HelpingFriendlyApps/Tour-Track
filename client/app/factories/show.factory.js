'use strict';

angular.module('Tour-Track')
.factory('ShowFactory', ["$http", "$sce", function($http, $sce) {

  return {
    
    splitSetlistBySet: function(setlist) {
      let sets = [],
        set = [];

      setlist.forEach((song, i) => {
        if(set[set.length-1] && set[set.length-1].set !== song.set) {
          sets.push(set);
          set = [];
        }
        set.push(song);
        if(i === setlist.length - 1) sets.push(set);
      });

      return sets;
    },

    getAllShows: function() {
      return $http.get('/shows').then(function(shows) {
        return shows.data;
      });
    },

    getShowById: function(showId) {
      return $http.get('/shows/' + showId).then(function(show) {
        return show.data;
      });
    },

    getNextShowByName: function(showName) {
      return $http.get('/shows/next/' + showName).then(function(show) {
        return show.data;
      });
    },

    getPrevShowByName: function(showName) {
      return $http.get('/shows/prev/' + showName).then(function(show) {
        return show.data;
      });
    },

    getShowByDate: function(date) {
      return $http.get('/shows/date/' + date.slice(0,10)).then(function(show) {
        return show.data;
      });
    },

    getNextShowByDate: function(date) {
      return $http.get('/shows/date/' + date.slice(0,10) + '/next').then(function(show) {
        return show.data;
      });
    },

    getPrevShowByDate: function(date) {
      return $http.get('/shows/date/' + date.slice(0,10) + '/prev').then(function(show) {
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

    getSetlistByShowId: function(showId) {
      return $http.get('/shows/setlist/showId/' + showId).then(function(setlist) {
        return setlist.data;
      });
    },

    getSetlistByDate: function(date) {
      return $http.get('/shows/setlist/date/' + date.slice(0,10)).then(function(setlist) {
        return setlist.data;
      });
    },

    getAllShowYears: function() {
      var years = [];
      return $http.get('/tours').then(function(tours) {
        tours.data.forEach( (tour) => {
          var startYear = tour.starts_on.slice(0,4);
          var endYear = tour.ends_on.slice(0,4);

          if(years.indexOf(startYear) < 0) years.push(startYear);
          if(years.indexOf(endYear) < 0) years.push(endYear);

          years.sort( (a,b) => {
            return a - b;
          });
        });
        return years;
      });
    },

    getRandomShow: function() {
      return $http.get('/shows/random').then(function(show) {
        return show.data;
      });
    },

    getRandomShowOnTodaysDate: function() {
      return $http.get('/shows/randomFromToday').then(function(show) {
        return show.data;
      });
    },

    getLastShow: function() {
      return $http.get('/shows/lastShow').then(function(show) {
        return show.data;
      });
    }

  }

}]);