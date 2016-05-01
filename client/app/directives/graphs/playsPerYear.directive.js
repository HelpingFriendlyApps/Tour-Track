'use strict'

app.directive('playsPerYear', [function() {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="barChart"></div>',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('data', function(data) {
        if(!data) return;
        var years = [];
        var counts = [];

        data.forEach(function(d) {
          years.push(d.year);
          counts.push(d.count);
        });

        // console.log('years', years)

        var chart = c3.generate({
          bindto: '#barChart',
          data: {
            columns: [
              ['Plays'].concat(counts)
            ],
            type: 'bar',
            colors: {
              Plays: '#475F77'
            }
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
                var num = "'" + y.slice(2,4)
                // console.log('num', num)
                // console.log('typeof num', typeof num)
                return num;
              }),
              tick: {
                culling: true,
                rotate: 60,
                outer: false
              }
            }
          }
        });

      });

    }
  };
}]);