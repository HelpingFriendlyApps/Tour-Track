'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', '$document', function($scope, allShows, ShowFactory, $document) {

  $scope.currentShowYear = '2016';
  let reverseOrder = true;

  ShowFactory.getAllShowYears().then(years => {
    $scope.showYears = years;
  });

  $scope.$watch('currentShowYear', (currentShowYear) => {
    console.log('herro')
    $scope.showSearchList = allShows.filter(show => moment(show.date).year() == $scope.currentShowYear);
    if(reverseOrder) $scope.showSearchList.reverse();

    $scope.showList = $scope.showSearchList.slice(0,4);
    $scope.selectedShow = $scope.showList[0];
    reverseOrder = false;
  });

  $scope.loadMoreShows = function(num = 4) {
    for(let i = 0; i < num; i++) {
      if($scope.showList.length === $scope.showSearchList.length) return;

      let nextShow = $scope.showSearchList[$scope.showList.length];
      $scope.showList.push(nextShow);
    }
  }

  $scope.selectShow = function(show, index) {
    $scope.selectedShow = show;
    var offset = index === 0 ? 0 : (index - 1) * 31;

    $('.show-list').animate({
      scrollTop: offset
    }, 1000);

    var showEl = document.getElementById('listAnchor_' + index)

    if(showEl) {
      $document.scrollToElement(showEl, 0, 1000);
    } else {
      var num = index - $scope.showList.length + 1;
      $scope.loadMoreShows(num);
      setTimeout(() => $document.scrollToElement(document.getElementById('listAnchor_' + index), 0, 1000), 0);
    }
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