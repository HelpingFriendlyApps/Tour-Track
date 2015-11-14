angular.module('Tour-Track').directive('showsperstate', function($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><div id="tooltip"></div> <svg width="960" height="600" id="statesvg"></svg></div>',
        controller: 'ProfileShowsVsYearCtrl',
        scope: {
            data: '='
        },
        link: function(scope, element, attrs) {

            function tooltipHtml(n, d){ /* function to create html content string in tooltip div. */
                // return "<h4>"+n+"</h4><table>"+
                //     "<tr><td>numShows</td><td>"+(d.shows.length)+"</td></tr>"+
                //     "<tr><td>numVenues</td><td>"+(d.venues.length)+"</td></tr>"+
                //     "</table>";

                var tooltipInfo = "<h4>"+n+"</h4><table>"+
                    "<tr><td>numShows</td><td>"+(d.shows.length)+"</td></tr>"+
                    "<tr><td>numVenues</td><td>"+(d.venues.length)+"</td></tr>";

                for(var i = 0; i < d.venues.length; i++) {
                    if(i === 0) {
                        tooltipInfo += "<tr><td>Venues</td><td>"+(d.venues[i])+"</td></tr>";
                    } else {
                        tooltipInfo += "<tr><td></td><td>"+(d.venues[i])+"</td></tr>";
                    }
                }
                tooltipInfo += "</table>";
                return tooltipInfo;

            }

            scope.$watch('data', function(newData, oldData) {
                dataset = newData;
                if(dataset)uStates.draw("#statesvg", dataset, tooltipHtml);
            })

        }
    };
});