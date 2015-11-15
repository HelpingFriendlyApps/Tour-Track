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
		}

	}

});