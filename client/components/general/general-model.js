'use strict';

angular.module('Tour-Track')
.factory('General', function($http, $sce) {

	return {
		
		shows: function () {
			return $http.get('/');
		}

	}

});