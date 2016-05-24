'use strict'

angular.module('Tour-Track').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('mapLeft', {
    url: '',
    templateUrl: '../views/mapLeft.html',
    controller: 'MapLeftCtrl'
  });

}]);