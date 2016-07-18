'use strict';

describe('fileUploader', function() {
	let fileUploader, $http;

    beforeEach(module('fileUploader'));

    beforeEach(inject(function(_fileUploader_, _$http_) {
    	fileUploader = _fileUploader_;
    	$http = _$http_;
    }));

	describe('when the file uploader is loaded', function() {
		//A good way to make sure everything is wired properly
	    it('it should contain a function to upload a file', function() {
	  		expect(fileUploader.uploadFile).toBeDefined();
		});

		it('it should have endpoints defined', function() {
	  		expect(fileUploader.endpoints).toBeDefined();
		});

		it('it should have the endpoints as a non-empty list', function() {
	  		expect(fileUploader.endpoints.length > 0).toBeTruthy();
		});

		it('it should have the endpoints contain an object with a name', function() {
	  		expect(fileUploader.endpoints[0].name).toBeDefined();
		});

		it('it should have the endpoints contain an object with a url', function() {
	  		expect(fileUploader.endpoints[0].url).toBeDefined();
		});
	});

	describe('when the uploadFile function is called with a mocked file', function() {
		beforeEach(function() {
			//You can spy on existing functions to check that they have been called
			//Spying on a function stops it from being called through unless 
			//explicitly stated (in other words, it is mocked)
			//You can also spy and return some fake value
			spyOn($http, 'post');
		});

	    it('it should call $http post with the given parameter', function() {
	    	//setup
	    	let fakeFile = "some file data";

	    	//execution
	    	fileUploader.uploadFile(fakeFile);

	    	//expectation
	  		expect($http.post).toHaveBeenCalledWith('url/to/exposed/node/service', fakeFile);
		});
	});

});