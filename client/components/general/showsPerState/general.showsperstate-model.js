'use strict';

angular.module('Tour-Track')
.factory('GeneralSVS', function () {
	
	return {

		showsVsStateCreator: function (shows) {
			var showsVsStateObj = {};
			var internationalShows = [];

			var states = ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
			"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
			"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
			"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
			"WI", "MO", "AR", "OK", "KS", "LA", "VA"];

			states.forEach(function(state) {
				var showsArr = shows.filter(function(show) {
					var location = show.location.split(", ");
					if(location.length > 2 || location[location.length-1].length > 2) {
						internationalShows.push(show);
						return;
					}
					return location[1] === state;
				});

				var venuesArr = [];
				showsArr.forEach(function(show) {
					if(venuesArr.indexOf(show.name) === -1) venuesArr.push(show.name);
				});
				showsVsStateObj[state] = {shows: showsArr, venues: venuesArr, color: d3.interpolate("#444857", "#E2121D")(showsArr.length/100)};
			});
			// console.log("internationalShows", internationalShows)
			return showsVsStateObj;
		}

	}

});