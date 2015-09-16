(function(){
	"use strict";

	angular.module('app.config').config( function(RestangularProvider) {
		RestangularProvider
		.setBaseUrl('/api/')
		.setDefaultHeaders({ accept: "application/x.laravel.v1+json" });
	});

})();
