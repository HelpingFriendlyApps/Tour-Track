'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', function($scope, allShows, ShowFactory) {

  $scope.currentShowYear = '2016';
  let reverseOrder = true;

  ShowFactory.getAllShowYears().then(years => {
    $scope.showYears = years;
  });

  $scope.$watch('currentShowYear', (currentShowYear) => {
    $scope.showSearchList = allShows.filter(show => moment(show.date).year() == $scope.currentShowYear);
    if(reverseOrder) $scope.showSearchList.reverse();

    console.log('$scope.showSearchList', $scope.showSearchList)

    $scope.showList = $scope.showSearchList.slice(0,2);
    reverseOrder = false;

    console.log('$scope.showList', $scope.showList)
  });

  $scope.loadMoreShows = function() {
    console.log('inside loadMoreShows')

    // if($scope.showList.length === $scope.showSearchList.length) return;

    // let nextShow = $scope.showSearchList[$scope.showList.length];
    // console.log('nextShow', nextShow)
    // $scope.showList.push(nextShow);


    for(let i = 0; i < 4; i++) {
      if($scope.showList.length === $scope.showSearchList.length) return;

      let nextShow = $scope.showSearchList[$scope.showList.length];
      $scope.showList.push(nextShow);
    }


    console.log('$scope.showList', $scope.showList)
  }

  $scope.selectShow = function(event, show) {
    console.log('event', event)
    $scope.selectedShow = show;
    var el = angular.element(event.currentEvent);
    console.log('el', el)

  }








  // $scope.currentShowYear = '2016';
  // let reverseOrder = true;
  
  // ShowFactory.getAllShowYears().then(years => {
  //   $scope.showYears = years;
  // });

  // $scope.$watch('currentShowYear', (currentShowYear) => {
  //   $scope.showSearchList = allShows.filter(show => moment(show.date).year() == $scope.currentShowYear);
  //   if(reverseOrder) $scope.showSearchList.reverse();

  //   $scope.showList = $scope.showSearchList.slice(0,12);
  //   reverseOrder = false;
  // });

  // $scope.loadMoreShows = function() {
  //   for(let i = 0; i < 4; i++) {
  //     if($scope.showList.length === $scope.showSearchList.length) return;

  //     let nextShow = $scope.showSearchList[$scope.showList.length];
  //     $scope.showList.push(nextShow);
  //   }
  // }

}]);