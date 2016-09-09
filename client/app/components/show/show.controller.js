'use strict';

angular.module('Tour-Track')
.controller('ShowCtrl', ['$scope', 'show', 'setlist', 'ShowFactory', function($scope, show, setlist, ShowFactory) {

  $scope.show = show;
  console.log('$scope.show', $scope.show)
  $scope.setlist = setlist;
  console.log('$scope.setlist', $scope.setlist)

  $scope.show.date = moment($scope.show.date);
  $scope.showMonth = moment().month(show.date.month()).format('MMM')

  ShowFactory.getShowsByTourId(show.tour_id).then(showsThisTour => {
    $scope.showsThisTour = showsThisTour;
    console.log('$scope.showsThisTour', $scope.showsThisTour)
  });


}]);