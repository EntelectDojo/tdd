'use strict';

angular.module('fileUploader', [])
       .service('fileUploader', function($http) {
       		this.endpoints = [
				{
					name: 'uploadFile',
					url: 'url/to/exposed/node/service'
				}
			];

       		this.uploadFile = function(data) {
       			$http.post(getEndpoint('uploadFile').url, data);
       		};

       		//not using ES6 in this project, otherwise we could jsut use an arrow function
       		let self = this;

			// This is a private function, therefore it gets tested through the function that uses it
			function getEndpoint(key) {
				return self.endpoints.filter(
			      function(endpoints){return endpoints.name == key}
			  	)[0]
			}
       		
       });