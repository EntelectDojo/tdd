'use strict';

describe('uploadView', function() {

	let controller, fileUploader;

    beforeEach(module('uploadView'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _fileUploader_) {
    	let $scope = _$rootScope_.$new();
    	let template = angular.element("<upload-view></upload-view>");
    	fileUploader = _fileUploader_;
    	template = _$compile_(template)($scope);

    	$scope.$digest();

		controller = template.controller("uploadView");

		spyOn(fileUploader, 'uploadFile');
    }));

	describe('when the upload view is loaded', function() {
	    it('it should have a function to upload a file', function() {
	   		expect(controller.uploadFile).toBeDefined();
		});
	});

	describe('when the upload file function is called', function() {
	    it('it should call the upload service\'s upload file function', function() {
	    	let file = "some test data";
	    	controller.file = file;
	    	
			controller.uploadFile(file);

	   		expect(fileUploader.uploadFile).toHaveBeenCalledWith(file);
		});
	});

});