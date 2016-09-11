'use strict';

console.log('HELLO')

angular.module('Tour-Track').component('mapModalComponent', {
  templateUrl: 'views/map-modal.html',
  bindings: {
    resolve: '<'
    // close: '&',
    // dismiss: '&'
  },
  controller: function () {

    console.log('inside component')

    this.token = this.resolve.token;
    console.log('this.token', this.token)

    var map = new mapboxgl.Map({
      container: 'map-modal',
      style: 'mapbox://styles/luismartins/ciohlmagz000yaunty3tmlj5e',
      center: [-98.35, 39.5],
      zoom: 5,
      attributionControl: false
    });

    map.resize();

  }
});