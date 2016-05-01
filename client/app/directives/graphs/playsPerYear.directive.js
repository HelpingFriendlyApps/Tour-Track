'use strict'

app.directive('playsPerYear', [function() {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="barchart"></div>',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('data', function(data) {
        if(!data) return;
        console.log('data', data)
        var years = [];
        var counts = [];

        data.forEach(function(d) {
          years.push(d.year);
          counts.push(d.count);
        });

        var barchart = c3.generate({
          bindto: '#barchart',
          data: {
            columns: [
              ['Plays'].concat(counts)
            ],
            type: 'bar'
          },
          bar: {
            width: {
              ratio: 0.5
            }
          },
          axis: {
            x: {
              type: 'category',
              categories: years.map(function(y) {
                return "'" + y.slice(2,4);
              }),
              tick: {
                culling: true,
                rotate: 60,
                outer: false
              }
            }
          }
        })

      });

    }
  };
}]);