'use strict';

angular.module('Tour-Track')
.controller('GeneralLayoutTree' , ['$scope', function ($scope) {
    
    $scope.layoutTreeObject = {
    	name: "flare",
    	children: [
    	{
    		name: "analytics",
    		size : 5000
    	}
    	]
    }

}]);