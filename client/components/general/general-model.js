'use strict';

angular.module('Tour-Track')
.factory('General', function($http, $sce) {

	return {
		
		shows: function () {
			return $http.get('/shows').then(function(shows) {
				shows.data.forEach(function(show) {
					show.sanitizedSetList = $sce.trustAsHtml(show.setlistdata);
				})
				return shows.data;
			})
		}

	}

});