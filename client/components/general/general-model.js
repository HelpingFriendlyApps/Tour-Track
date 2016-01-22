'use strict';

angular.module('Tour-Track')
.factory('General', function($http, $sce) {

	return {

		allShows: function() {
			return $http.get('/shows').then(function(shows) {
				// shows.data.forEach(function(show) {
				// 	show.sanitizedSetList = $sce.trustAsHtml(show.setlistdata);
				// });
				return shows.data;
			});
		},

		showById: function(showId) {
			return $http.get('/shows/' + showId).then(function(show) {
				return show.data;
			});
		},

		allShowsByYear: function(year) {
			return $http.get('/shows/year/' + year).then(function(shows) {
				return shows.data;
			});
		},

		allShowsByVenueId: function(venueId) {
			return $http.get('/shows/venueId/' + venueId).then(function(shows) {
				return shows.data;
			});
		},

		allShowsByTourId: function(tourId) {
			return $http.get('/shows/tourId/' + tourId).then(function(shows) {
				return shows.data;
			});
		},
		
		setlistByShow: function (showId) {
			return $http.get('/shows/setlist/' + showId).then(function(setlist) {
				return setlist.data;
			});
		},

		allSongs: function () {
			return $http.get('/songs').then(function(songs) {
				return songs.data;
			});
		},

		songById: function(songId) {
			return $http.get('/songs/' + songId).then(function(song) {
				return song.data;
			});
		},

		allTours: function () {
			return $http.get('/tours').then(function(tours) {
				return tours.data;
			});
		},

		tourById: function (id) {
			return $http.get('/tours/' + id).then(function(tour) {
				return tour.data;
			});
		},

		// allToursWithShows: function() {
		// 	return $http.get('/tours/shows').then(function(tours) {
		// 		return tours.data;
		// 	});
		// },

		allVenues: function () {
			return $http.get('/venues').then(function(venues) {
				return venues.data;
			});
		},

		venueById: function (id) {
			return $http.get('/venues/' + id).then(function(venue) {
				return venue.data;
			});
		},

		allYears: function() {
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