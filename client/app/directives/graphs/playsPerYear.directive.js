'use strict'

app.directive('playsPerYear', [function() {
  return {
    restrict: 'E',
    template: '<div id="playsPerYear"></div>',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('data', (data) => {
        if(!data) return;
        var years = [];
        var counts = [];

        data.forEach( (d) => {
          years.push(d.year);
          counts.push(d.count);
        });

        var chart = c3.generate({
          bindto: '#playsPerYear',
          data: {
            columns: [
              ['Plays'].concat(counts)
            ],
            type: 'bar',
            colors: {
              Plays: '#F25F5C'
            }
          },
          bar: {
            width: {
              ratio: 0.75
            }
          },
          axis: {
            x: {
              show: false,
              padding: { left: 0, right: 0 },
              type: 'category',
              categories: years.map( (y) => {
                return "'" + y.slice(2,4);
              }),
              tick: {
                culling: true,
                rotate: 60,
                outer: false
              }
            },
            y: {
              show: false,
              padding: { top: 0, bottom: 0 }
            }
          },
          legend: {
            show: false
          }
        });

      });

    }
  };
}]);