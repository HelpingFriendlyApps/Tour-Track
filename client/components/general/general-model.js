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
			return $http.get('/shows/showId/' + showId).then(function(show) {
				return show.data;
			});
		},

		allShowsWithVenueInfo: function() {
			return $http.get('/shows/venues').then(function(shows) {
				return shows.data;
			});
		},

		getShowWithVenueInfoById: function(showId) {
			return $http.get('/shows/venues/showId/' + showId).then(function(show) {
				return show.data;
			});
		},

		allShowsWithVenueInfoByTourId: function(tourId) {
			return $http.get('/shows/venues/tourId/' + tourId).then(function(shows) {
				return shows.data;
			});
		},
		
		allShowsWithVenueTourInfo: function () {
			return $http.get('/shows/venuesTours').then(function(shows) {
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

		setlistByShow: function (showId) {
			return $http.get('/shows/setlist/' + showId).then(function(setlist) {
				return setlist.data;
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

		allToursWithShows: function() {
			return $http.get('/tours/shows').then(function(tours) {
				return tours.data;
			});
		},

		allVenues: function () {
			return $http.get('/venues').then(function(venues) {
				return venues.data;
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