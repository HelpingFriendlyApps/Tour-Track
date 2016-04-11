'use strict'

angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('base.home', {
    url: '/',
    templateUrl: '../views/home.html',
    controller: 'HomeCtrl'
  });

});