'use strict'

angular.module('Tour-Track').directive('throbber', function() {
  return {
    restrict: "E",
    scope: {
      loading: '='
    },
    templateUrl: '../views/directives/throbber.html',
    link: function(scope, element, attrs) {
        scope.$watch("loading", function(newVal, oldVal){
            if(newVal){
                $(element).show();
            } else {
                $(element).hide();
            }
        })
    }
  };
});