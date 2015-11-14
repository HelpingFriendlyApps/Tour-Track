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
		},

		showStates: function (shows) {
			var states = {};
			shows.forEach(function(show) {
				!states[show.state] ? states[show.state] = [] : states[show.state].push(show);
			})
			return states;
		},

		showStatesSorter: function (showStates) {
			var topStates = [];
			for (var state in showStates) {
				topStates.push([state, showStates[state]]);
				topStates.sort(function(a, b) {
					return b[1].length-a[1].length;
				});
			}
			return topStates;
		},

		topXStates: function (x, states) {
			var topXstates = states.slice(0,x);
			return topXstates;
		}

	}
});
