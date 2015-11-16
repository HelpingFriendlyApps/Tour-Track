'use strict';

angular.module('Tour-Track')
.factory('General', function($http, $sce) {

	return {
		
		allShows: function () {
			return $http.get('/shows/venues').then(function(shows) {
				shows.data.forEach(function(show) {
					show.sanitizedSetList = $sce.trustAsHtml(show.setlistdata);
				});
				return shows.data;
			});
		},

		allSongs: function () {
			return $http.get('/songs').then(function(songs) {
				return songs.data;
			});
		},

		allTours: function () {
			return $http.get('/tours').then(function(tours) {
				return tours.data;
			});
		},

		allVenues: function () {
			return $http.get('/venues').then(function(venues) {
				return venues.data;
			});
		},

		allYears: function (tours) {
			var years = [];

			tours.forEach(function(tour) {
				var year = tour.starts_on.slice(0,4);
				if(years.indexOf(year) === -1) {
					years.push(year);
					years.sort(function(a, b) {
						return a - b;
					})
				}
			});
			return years;
		}

	}
});