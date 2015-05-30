(function(){
	"use strict";

	angular.module('app.config').config( function(RestangularProvider) {
		RestangularProvider
		.setBaseUrl('/api/v1/')
		.setDefaultHeaders({'X-CSRF-TOKEN': document.getElementById('csrf-token').value });
	});

})();