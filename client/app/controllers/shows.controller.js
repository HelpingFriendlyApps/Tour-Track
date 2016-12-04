'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', '$document', function($scope, allShows, ShowFactory, $document) {

  $scope.currentShowYear = '2016';
  let reverseOrder = true;

  ShowFactory.getAllShowYears().then(years => {
    $scope.showYears = years;
  });

  $scope.$watch('currentShowYear', (currentShowYear) => {
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

  $scope.selectShowInSearch = function(show, index) {
    $scope.selectedShow = show;
    scrollToIndexInSearch(index);
    scrollToIndexInList(index);
  }

  function scrollToIndexInSearch(index) {
    var offset = index === 0 ? 0 : (index - 1) * 31;
    console.log('offset', offset)

    // var showListEl = angular.element(document.getElementsByClassName('show-list')[0]);
    // console.log('showListEl', showListEl)
    // console.log('$document', $document)
    
    // $document.scrollTop(offset, 1000);
    // showListEl.scrollTop(offset, 1000);

    var isScrolling = true;

    $('.show-list').animate({
      scrollTop: offset
    }, 1000);

    setTimeout(() => {
      isScrolling = false;
    }, 1000);

    // $document.scrollToElement(document.getElementById('searchAnchor_' + index), 0, 1000)
  }

  function scrollToIndexInList(index) {
    var showEl = document.getElementById('listAnchor_' + index)
    if(showEl) {
      $document.scrollToElement(showEl, 0, 1000);
    } else {
      var num = index - $scope.showList.length + 1;
      $scope.loadMoreShows(num);
      setTimeout(() => $document.scrollToElement(document.getElementById('listAnchor_' + index), 0, 1000), 0);
    }
  }

  $document.bind('scroll', function() {
    clearTimeout($.data(this, 'scrollCheck'));
    $.data(this, 'scrollCheck', setTimeout(function() {
      for (let i = 0; i < $scope.showList.length; i++) {
        if($scope.showList[i].inView) {
          console.log('sup i', i)
          $scope.$apply(() => $scope.selectedShow = $scope.showList[i]);
          scrollToIndexInSearch(i);
          break;
        }
      }
    }, 250));
  });

  






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