'use strict';

angular.module('Tour-Track')
.factory('ShowTrackerFactory', function($http, General) {
	
	return {

		showsPerMonth: function() {
			var showsPerMonth = [];
			return General.allYears().then( (years) => {
				years.forEach(function(year) {
					for(let i = 1; i <= 12; i++) {
						showsPerMonth.push({ date: year + '-' + ('0' + i).slice(-2), showCount: 0 });
					}
				});
				return General.allShows().then( (shows) => {
					shows.forEach(function(show) {
						for(let i = 0; i < showsPerMonth.length; i++) {
							if(showsPerMonth[i].date === show.date.slice(0,7)) {
								showsPerMonth[i].showCount++;
								break;
							}
						}
					});
					return showsPerMonth;
				});
			});
		}



	}

});