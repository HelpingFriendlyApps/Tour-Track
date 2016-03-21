'use strict';

angular.module('Tour-Track')
.controller('ShowCtrl', ['$scope', 'show', 'setlist', 'TourFactory', 'VenueFactory', function($scope, show, setlist, TourFactory, VenueFactory) {

  $scope.show = show;
  console.log('$scope.show', $scope.show)
  $scope.setlist = setlist;

  $scope.dateParser = function(date) {
    return date.slice(0,10).replace(/(-)/g, '/');
  }

  $scope.timeParser = function(ms) {
    var min = Math.floor(ms / 60000);
    var sec = Math.floor(ms / 1000 % 60);
    if(sec < 10) sec = '0' + sec;
    return min + ':' + sec;
  }

  TourFactory.getTourById(show.tour_id).then(function(tour) {
    $scope.tour = tour;
  });

  VenueFactory.getVenueById(show.venue_id).then(function(venue) {
    $scope.venue = venue;
  });

}]);