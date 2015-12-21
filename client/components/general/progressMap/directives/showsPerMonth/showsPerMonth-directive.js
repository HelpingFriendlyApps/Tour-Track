'use strict';

angular.module('Tour-Track').directive('showsPerMonth', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="showsPerMonthGraph"></div>',
        scope: {
        	showsPerMonth: '='
        },
        link: function(scope, element, attrs) {

        	var margin = {top: 20, right: 20, bottom: 30, left: 30},
        		width = 1600 - margin.left - margin.right,
        		height = 100 - margin.top - margin.bottom;

    		var parseDate = d3.time.format("%Y-%m").parse;

    		var x = d3.time.scale()
    			.range([0, width]);

			var y = d3.scale.linear()
				.range([height, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom');

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left');

			var area = d3.svg.area()
				.interpolate('bundle')
				.x(function(d) { return x(d.parsedDate); })
				.y0(height)
				.y1(function(d) { return y(d.showCount); });

			var svg = d3.select('#showsPerMonthGraph').append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        	scope.$watch('showsPerMonth', function(showsPerMonth) {
        		if(showsPerMonth) {
	        		showsPerMonth.forEach( (month) => {
	        			month.parsedDate = parseDate(month.date);
	        		});

	        		x.domain(d3.extent(showsPerMonth, function(d) { return d.parsedDate; }));
	        		y.domain([0, d3.max(showsPerMonth, function(d) { return d.showCount; })]);

	        		svg.append('path')
	        			.datum(showsPerMonth)
	        			.attr('class', 'area')
	        			.attr('d', area);

        			svg.append('g')
        				.attr('class', 'x axis')
        				.attr("transform", "translate(0," + height + ")")
        				.call(xAxis);

    				svg.append('g')
    					.attr('class', 'y axis')
    					.call(yAxis);

        		}
        	}, true);



        }
    };
});