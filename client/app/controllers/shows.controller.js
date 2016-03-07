'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', function($scope, allShows) {

  $scope.shows = allShows;

}]);