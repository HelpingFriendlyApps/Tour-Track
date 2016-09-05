'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', function($scope, allShows, ShowFactory) {

  $scope.currentShowYear = '2016';
  
  ShowFactory.getAllShowYears().then(years => {
    $scope.showYears = years;
  });

  $scope.$watch('currentShowYear', (currentShowYear) => {
    $scope.showsByYear = allShows.filter(show => show.date.slice(0,4) === $scope.currentShowYear);
    $scope.showList = $scope.showsByYear.slice(0,4);
  });

  $scope.loadMoreShows = function() {
    for(let i = 0; i < 4; i++) {
      if($scope.showList.length === $scope.showsByYear.length) return;

      let nextShow = $scope.showsByYear[$scope.showList.length];
      $scope.showList.push(nextShow);
    }
  }

}]);