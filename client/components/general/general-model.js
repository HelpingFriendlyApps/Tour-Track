'use strict';

angular.module('Tour-Track')
.factory('General', function($http, $sce) {

	return {
		
		shows: function () {
			return $http.get('/shows').then(function(shows) {
				// console.log("shows from general model", shows)
				shows.data.forEach(function(show) {
					show.sanitizedSetList = $sce.trustAsHtml(show.setlistdata);
				})
				return shows.data;
			})
		}

	}

});