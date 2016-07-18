'use strict';

angular.module('uploadView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload');
}])

.directive('uploadView', function() {
  return {
    templateUrl: './uploadView.html',
    bindToController: {},
    restrict: 'E',
    controller: function() {
    	
    }
  };
});