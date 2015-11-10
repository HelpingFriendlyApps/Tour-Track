'use strict';

angular.module('myApp')
  .controller('AboutCtrl', ['$scope','$http', function($scope,$http) {
    $http.get('/me')
    .success(function(data, status, headers, config) {
    	$scope.header = data;
    })
}]);
