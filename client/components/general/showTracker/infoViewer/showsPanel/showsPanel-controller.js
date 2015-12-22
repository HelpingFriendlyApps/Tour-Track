'use strict';

angular.module('Tour-Track')
.controller('ShowsPanelCtrl', ['$scope', 'General', function($scope, General) {

	$scope.dateParser = function(date) {
        return date.slice(0,10).replace(/(-)/g, '/');
    }

	$scope.getSetlist = function(show) {
		console.log('show', show)
		General.setlistByShow(show.id).then(function(setlist) {
			console.log('setlist', setlist)
		});
	}

	console.log('$scope.currentView in shows', $scope.currentView)


}]);