'use strict'

angular.module('Tour-Track').directive('scrollTo', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      scope.$watch('selectedYear', function(newVal, oldVal) {
        if(newVal && newVal !== oldVal) {
          console.log('newVal', newVal)
          $('body').scrollTop(element.find('li').eq(newVal).position().top) 
        }
      });

    }
  };
});