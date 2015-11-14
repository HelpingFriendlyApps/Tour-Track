'use strict';

angular.module('Tour-Track')
.factory('SVS', function () {
	return {

		showsVsStateCreator: function (shows) {
			var showsVsStateObj = {};

			var states = ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
			"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
			"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
			"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
			"WI", "MO", "AR", "OK", "KS", "LS", "VA"];

			states.forEach(function(state) {
				var stateShows = shows.filter(function(show) {
					return show.state === state;
				});
				showsVsStateObj[state] = stateShows;
			});
			return showsVsStateObj;
		}

	}
});
