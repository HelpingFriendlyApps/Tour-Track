'use strict'

angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('show', {
    url: '/show/:date',
    templateUrl: '../views/show.html',
    controller: 'ShowCtrl',
    resolve: {
      show: function(ShowFactory, $stateParams) {
        return ShowFactory.getShowByDate($stateParams.date);
      },

      setlist: function(ShowFactory, $stateParams) {
        return ShowFactory.getSetlistByDate($stateParams.date);
      }
    }
  });

});