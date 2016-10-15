'use strict';

angular.module('Tour-Track').directive('whenscrollends', [function() {
  return {
    restrict: 'A',
    replace: true,
    link: function(scope, element, attrs) {
      console.log('element', element)
      var visibleHeight = element[0].offsetHeight;
      // var visibleHeight = element.height;
      console.log('visibleHeight', visibleHeight)
      var threshold = 100;

      element[0].scroll(function() {
        var scrollableHeight = element.prop('scrollHeight');
        var hiddenContentHeight = scrollableHeight - visibleHeight;

        if(hiddenContentHeight - element.scrollTop() <= threshold) {
          scope.$apply(attrs.whenScrollEnds);
        }

      });

    }
  }
}])