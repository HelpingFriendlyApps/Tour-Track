'use strict'

angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('profile', {
    url: '/profile/',
    templateUrl: '../views/profile.html',
    controller: 'ProfileCtrl',
    resolve: {}
  });

});