'use strict';

angular.module('resultsListView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'app/resultsListView/resultsListView.html'
  });
}])

.directive('resultsListView', function() {
	return {
    bindToController: {},
    restrict: 'E',
    controllerAs:'resultsListView',
    controller: function() {
    	
    }
  };
});