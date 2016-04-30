'use strict'

angular.module('Tour-Track').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('shows', {
    url: '/shows',
    templateUrl: '../views/shows.html',
    controller: 'ShowsCtrl',
    // onEnter: function($state) {
    //   console.log('entering shows onEnter', arguments)
    // },
    resolve: {
      allShows: function(ShowFactory) {
        return ShowFactory.getAllShows();
      }
    }
  });

}]);