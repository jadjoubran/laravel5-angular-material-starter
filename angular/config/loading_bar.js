(function (){
	"use strict";

	angular.module('app.config').config(function (cfpLoadingBarProvider){
		cfpLoadingBarProvider.includeSpinner = false;
	});

})();
