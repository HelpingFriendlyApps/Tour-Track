'use strict';

var app = angular.module('Tour-Track', [
  'ui.router',
  'ngSanitize',
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'duScroll',
  'ngStorage'
])
  
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
 
}]);
