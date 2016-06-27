'use strict';

angular.module('resultsListView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'app/resultsListView/resultsListView.html',
    controller: 'ctrlResultsListView'
  });
}])

.directive('resultsListView', function() {

});