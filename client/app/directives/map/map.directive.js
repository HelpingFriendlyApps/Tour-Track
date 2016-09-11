'use strict'

angular.module('Tour-Track').directive('map', ['$uibModal', function($uibModal) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/directives/map/map.html',
    scope: {
      token: '=',
      lngLat: '='
    },
    link: function(scope, element, attrs) {

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

        console.log('opening modal')

        var modalInstance = $uibModal.open({
          animation: true,
          // ariaLabelledBy: 'modal-title',
          // ariaDescribedBy: 'modal-body',
          templateUrl: 'views/modals/map-modal.html',
          // templateUrl: '../../../views/modals/map-modal.html',
          controller: 'MapModalCtrl',
          // controllerAs: '$ctrl',
          // size: 'lg',
          resolve: {
            items: function() {
              return [1,2,3];
            }
          }
        });

        // modalInstance.result.then(selectedItem => {
        //   scope.selected = selectedItem;
        // }, function() {
        //   console.log('modal dismissed at: ', new Date());
        // });

      }

    }
  };
}]);