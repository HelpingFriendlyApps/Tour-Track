'use strict'

app.directive('setlistTimeFlow', [function() {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="setlistTimeFlow"></div>',
    scope: {
      setlist: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('setlist', (setlist) => {

        var SetObj = function(number) {
          this.number = number;
          this.duration = 0;
          this.songList = [];
        }

        var SongObj = function(name, length, setObj) {
          this.songName = name;
          this.y = length / 1000;
          this.x = setObj.duration + length / 2 / 1000;
        }

        var sets = [];
        var setObj;
        var prevSet = 0;

        setlist.forEach( (song, i) => {
          if(i === setlist.length - 1 || song.set > prevSet) {
            if(prevSet === 'E') return;
            if(setObj) sets.push(setObj);
            setObj = new SetObj(song.set);
          }
          var songObj = new SongObj(song.title, song.duration, setObj);
          setObj.duration += song.duration / 1000;
          setObj.songList.push(songObj);
          prevSet = song.set;
        });

        var xs = {};
        sets.forEach( (set) => {
          xs['Set ' + set.number] = 'x' + set.number;
        });

        var x = sets.map( (set) => {
          var vals = set.songList.map( (song) => {
            return song.x / set.duration;
          });
          return ['x' + set.number, 0, ...vals, 1];
        });

        var y = sets.map( (set) => {
          var vals = set.songList.map( (song) => {
            return song.y;
          });
          return ['Set ' + set.number, 0, ...vals, 0];
        });

        
        var chart = c3.generate({
          bindto: '#setlistTimeFlow',
          data: {
            xs: xs,
            columns: [...x, ...y],
            type: 'area-spline',
            colors: {
              'Set 1': '#D74B4B',
              'Set 2': '#475F77',
              'Set 3': '#158A36 '
            },
            color: function(color, d) {
              return color;
            }
          },
          axis: {
            x: {
              show: false,
              padding: { left: 0, right: 0 }
            },
            y: {
              show: false,
            }
          },
          legend: {
            show: true,
            position: 'right'
          },
          tooltip: {
            format: {
              title: function(d) { return; },
              name: function(name, ratio, id, index) {
                var set = name.slice(-1);
                return sets[set-1].songList[index].songName;
              },
              value: function (value, ratio, id) {
                var minutes = Math.floor(value / 60),
                  seconds = Math.floor(value % 60);
                return minutes + ':' + seconds;
              }
            }
          }

        });

        setTimeout(function() {
          chart.flush();
        }, 300);
        
      });

    }
  };
}]);