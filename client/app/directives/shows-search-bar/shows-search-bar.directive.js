'use strict'

angular.module('Tour-Track').directive('showsSearchBar', ['$document', function($document) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/directives/shows-search-bar/shows-search-bar.html',
    link: function(scope, element, attrs) {

      $document.on('scroll', function() {
        let navbar = angular.element(document.getElementById('navbar')),
          searchBar = angular.element(document.getElementsByClassName('shows-search-bar')),
          topContainer = angular.element(document.getElementsByClassName('top-container'));

        if(searchBar[0].offsetTop - navbar[0].offsetHeight < $document.scrollTop()) {
          searchBar.addClass('fix-search-bar');
        }
        if($document.scrollTop() < topContainer[0].offsetHeight - searchBar[0].offsetHeight) {
          searchBar.removeClass('fix-search-bar');
        }
      });

    }
  };
}]);