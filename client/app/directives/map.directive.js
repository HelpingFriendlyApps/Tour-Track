'use strict'

angular.module('Tour-Track').directive('map', ['$uibModal', function($uibModal) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/map.html',
    scope: {
      token: '=',
      lngLat: '='
    },
    link: function(scope, element, attrs) {

      console.log('scope.token', scope.token)
      console.log('scope.lngLat', scope.lngLat)

      mapboxgl.accessToken = scope.token;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/ciohlmagz000yaunty3tmlj5e',
        center: scope.lngLat || [-98.35, 39.5],
        zoom: 5,
        attributionControl: false
      });

      scope.openModal = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          component: 'mapModalComponent',
          size: 'lg',
          resolve: {
            token: function() {
              return scope.token;
            }
          }
        });
      }

    }
  };
}]);