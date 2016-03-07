'use strict'

angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('shows', {
    url: '/shows',
    templateUrl: '../views/shows.html',
    controller: 'ShowsCtrl',
    resolve: {
      allShows: function(ShowFactory) {
        return ShowFactory.getAllShows();
      }
    }
  });

});