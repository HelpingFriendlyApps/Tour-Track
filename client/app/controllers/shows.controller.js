'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', function($scope, allShows, ShowFactory) {

  $scope.currentShowYear = '2016';
  let reverseOrder = true;
  
  ShowFactory.getAllShowYears().then(years => {
    $scope.showYears = years;
  });

  $scope.$watch('currentShowYear', (currentShowYear) => {
    $scope.showsByYear = allShows.filter(show => moment(show.date).year() == $scope.currentShowYear);
    if(reverseOrder) $scope.showsByYear.reverse();

    $scope.showList = $scope.showsByYear.slice(0,12);
    reverseOrder = false;
  });

  $scope.loadMoreShows = function() {
    for(let i = 0; i < 4; i++) {
      if($scope.showList.length === $scope.showsByYear.length) return;

      let nextShow = $scope.showsByYear[$scope.showList.length];
      $scope.showList.push(nextShow);
    }
  }

}]);