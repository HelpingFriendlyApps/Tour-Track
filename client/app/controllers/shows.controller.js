'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', function($scope, allShows, ShowFactory) {

  $scope.shows = allShows;





  $scope.selectedYear = 0;
  ShowFactory.getAllShowYears().then(function(years) {
    $scope.allYears = years;
  });


  $scope.$watch('selectedYear', function(yearIdx) {
    console.log('yearIdx', yearIdx)
    // var currentYear = $scope.allYears[yearIdx];
    // var topIndex = $scope.shows.indexOf()
    // $scope.topIndex = year;
  });

  // $scope.$watch('selec')

  
  $scope.firstShowsOfYear = [];

  $scope.checkforNewYear = function(currIdx, prevIdx) {
    var curr = $scope.shows[currIdx],
      prev = $scope.shows[prevIdx];
    if(!prev || curr.date.slice(0,4) !== prev.date.slice(0,4)) {
      if($scope.firstShowsOfYear.indexOf(currIdx) < 0) $scope.firstShowsOfYear.push(currIdx);
      return true;
    }
    return false;
  }

  $scope.doIt = function() {
    console.log('$scope.selectedYear', $scope.selectedYear)
    console.log('$scope.firstShowsOfYear', $scope.firstShowsOfYear)
  }


}]);