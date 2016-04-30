'use strict'

angular.module('Tour-Track').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '../views/login.html',
    controller: 'LoginCtrl'
  });

}]);