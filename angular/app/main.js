(function(){
	"use strict";
	var app = angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config',
		]);

	angular.module('app.routes', ['ui.router']);
	angular.module('app.controllers', ['ui.router']);
	angular.module('app.filters', []);
	angular.module('app.services', ['ui.router']);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();