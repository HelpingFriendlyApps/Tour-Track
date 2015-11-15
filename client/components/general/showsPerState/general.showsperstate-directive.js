angular.module('Tour-Track').directive('generalshowsperstate', function($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><div id="tooltip"></div> <svg width="960" height="600" id="statesvg"></svg></div>',
        controller: 'ProfileShowsVsYearCtrl',
        scope: {
            data: '='
        },
        link: function(scope, element, attrs) {

            function tooltipHtml(n, d) {

                var tooltipInfo = "<h4>"+n+"</h4><table>"+
                    "<tr><th>Number of Shows: &nbsp;&nbsp;&nbsp;"+(d.shows.length)+"</th></tr>"+
                    "<tr><th>Number of Venues: &nbsp;&nbsp;&nbsp;"+(d.venues.length)+"</th></tr>"+
                    "<tr class='venueTitle'><th>Venues</th></tr>"

                for(var i = 0; i < d.venues.length; i++) {
                    tooltipInfo += "<tr><td>"+(d.venues[i])+"</td></tr>";
                }
                tooltipInfo += "</table>";
                return tooltipInfo;
            }

            scope.$watch('data', function(newData, oldData) {
                dataset = newData;
                if(dataset) {
                    uStates.draw("#statesvg", dataset, tooltipHtml);
                }
            });

        }
    };
});