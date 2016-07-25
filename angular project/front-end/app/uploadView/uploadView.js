'use strict';

angular.module('uploadView', ['ngRoute', 'fileUploader'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload', {
    templateUrl: 'app/uploadView/uploadView.html'
  });
}])

.directive('uploadView', function() {
  return {
    bindToController: {},
    restrict: 'E',
    controllerAs:'ctrlUploadView',
    controller: function(fileUploader) {
    	 this.uploadFile = function() {
          fileUploader.uploadFile(this.file);
       }

    }
  };
});