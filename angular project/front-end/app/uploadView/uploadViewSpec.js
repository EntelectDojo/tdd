'use strict';

describe('uploadView', function() {

	let controller;

    beforeEach(module('resultsListView'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
    	let $scope = _$rootScope_.$new();
    	let template = angular.element("<upload-view></upload-view>");
    	template = _$compile_(template)($scope);

    	$scope.$digest();

		controller = template.controller("uploadView");
    	console.log(template);
    }));

	describe('when the upload view is loaded', function() {
	   
	});

});