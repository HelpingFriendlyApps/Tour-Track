'use strict'

app.directive('playsPerYear', [function() {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="chart"></div>',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('data', function(data) {
        console.log('data', data)
      });

    }
  };
}]);