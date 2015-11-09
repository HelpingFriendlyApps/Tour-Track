'use strict';

angular.module('myApp')
  .controller('MainCtrl', ['$scope', function($scope) {
  	$scope.welcome = 'Welcome to Tour Track!';
  	$scope.buttonText = 'Facebook Signin';
  }]);
