'use strict'

angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('show', {
    url: '/show/:showId',
    templateUrl: '../views/show.html',
    controller: 'ShowCtrl',
    resolve: {
      show: function(ShowFactory, $stateParams) {
        return ShowFactory.getShowById($stateParams.showId);
      },

      setlist: function(ShowFactory, $stateParams) {
        return ShowFactory.getSetlistByShowId($stateParams.showId);
      }
    }
  });

});