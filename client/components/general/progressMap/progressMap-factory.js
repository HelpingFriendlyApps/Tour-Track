'use strict';

angular.module('Tour-Track')
.factory('ProgressMapFactory', function () {
	
	return {

		allToursWithShows: function(tours, shows) {
			shows.forEach(function(show) {
				for(let i = 0; i < tours.length; i++) {
					if(shows.tour_id === tours[i].id) {
						if(!tours[i].shows) tours[i].shows = [];
						tours[i].shows.push(show);
						break;
					}
				}
			});
			return shows;
		}

	}

});