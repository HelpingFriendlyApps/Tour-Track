'use strict';

angular.module('Tour-Track')
.controller('GeneralShowsPerState' , ['$scope', 'General', 'GeneralSVS', function ($scope, General, GeneralSVS) {
    
	General.allShows().then(function(data) {
		$scope.shows = data;
		$scope.allShowsPerState = GeneralSVS.showsVsStateCreator($scope.shows);
		return data;
	});

}]);