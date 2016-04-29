'use strict'

angular.module('Tour-Track').directive('scrollTo', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      scope.$watch('selectedYear', function(newVal, oldVal) {
        if(newVal && newVal !== oldVal) {
          console.log('newVal', newVal)
          // $('.show-list').scrollTop(element.find('li').eq(newVal).position().top)
          console.log('element', element)
          // console.log('element.find("li").eq(newVal)', element.find("li").eq(newVal))
          console.log('element.find("li").eq(10)', element.find("li").eq(10))
          // $('.show-list').scrollTop(element.find('md-list-item').eq(newVal).position().top)
          $('.show-list').scrollTop(1000)
        }
      });

    }
  };
}]);