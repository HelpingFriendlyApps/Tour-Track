'use strict';

angular.module('Tour-Track')
  .controller('HomeCtrl', ['$scope', function($scope) {
  	$scope.welcome = 'Tour Track';
  	$scope.buttonText = 'Facebook Signin';
}]);