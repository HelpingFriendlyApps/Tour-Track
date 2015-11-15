'use strict';
/* global $ google */

var mapModule = (function(){

  var exports = {},
      map,
      markers = [],
      bounds = new google.maps.LatLngBounds(),
      iconPath = {
        hotels: '/images/lodging_0star.png',
        restaurants: '/images/restaurant.png',
        activities: '/images/star-3.png'
      },
      FScoords = new google.maps.LatLng(40.705189, -74.009209);

  function extendBounds (marker) {
    bounds.extend(marker.position);
    map.fitBounds(bounds);
  }

  exports.drawAttraction = function (attraction) {
    var coords = attraction.place[0].location,
        options = {
          icon: iconPath[attraction.type],
          position: new google.maps.LatLng(coords[0], coords[1]),
          map: map,
          animation: google.maps.Animation.DROP
        },
        marker = new google.maps.Marker(options);
    markers.push(marker);
    extendBounds(marker);
    return marker;
  };

  exports.eraseMarkers = function () {
    markers.forEach(function(marker){
      marker.setMap(null);
    });
    markers = [];
    map.setOptions({
      zoom: 13,
      center: FScoords
    });
    bounds = new google.maps.LatLngBounds();
  };

  function initializeGmaps() {
    // set the map options hash
    var mapOptions = {
      center: FScoords,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styleArr
    };
    // get the maps div's HTML obj
    var mapCanvas = document.getElementById('map-canvas');
    // initialize a new Google Map with the options
    map = new google.maps.Map(mapCanvas, mapOptions);
  }

  $(document).ready(function() {
    initializeGmaps();
  });

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{
      saturation: -100
    }, {
      lightness: 60
    }]
  }, {
    featureType: 'road.local',
    stylers: [{
      saturation: -100
    }, {
      lightness: 40
    }, {
      visibility: 'on'
    }]
  }, {
    featureType: 'transit',
    stylers: [{
      saturation: -100
    }, {
      visibility: 'simplified'
    }]
  }, {
    featureType: 'administrative.province',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'water',
    stylers: [{
      visibility: 'on'
    }, {
      lightness: 30
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#ef8c25'
    }, {
      lightness: 40
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#b6c54c'
    }, {
      lightness: 40
    }, {
      saturation: -40
    }]
  }];

  return exports;

}());