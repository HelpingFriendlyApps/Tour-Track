'use strict'

angular.module('Tour-Track').directive('showsSearchBar', ['$document', function($document) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/components/shows/shows-search-bar.html',
    link: function(scope, element, attrs) {

      $document.on('scroll', function() {
        let navbar = angular.element(document.getElementById('navbar')),
          searchBar = angular.element(document.getElementsByClassName('shows-search-bar')),
          mapContainer = angular.element(document.getElementsByClassName('map-container'));

        if(searchBar[0].offsetTop - navbar[0].offsetHeight < $document.scrollTop()) {
          searchBar.addClass('fix-search-bar');
        }
        if($document.scrollTop() < mapContainer[0].offsetHeight - searchBar[0].offsetHeight) {
          searchBar.removeClass('fix-search-bar');
        }
      });

    }
  };
}]);