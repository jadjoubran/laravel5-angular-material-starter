/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(5);

	__webpack_require__(7);

	__webpack_require__(8);

	__webpack_require__(9);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	angular.module('app', ['app.controllers', 'app.filters', 'app.services', 'app.components', 'app.routes', 'app.config', 'partialsModule']);

	angular.module('app.routes', []);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular', 'angular-loading-bar']);
	angular.module('app.filters', []);
	angular.module('app.services', []);
	angular.module('app.components', []);
	angular.module('app.config', []);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _landing = __webpack_require__(4);

	angular.module('app.controllers').controller('LandingController', _landing.LandingController);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LandingController = exports.LandingController = function LandingController() {
		_classCallCheck(this, LandingController);

		var vm = this;

		vm.laravel_description = 'Response macros integrated with your Angular app';
		vm.angular_description = 'Query your API without worrying about validations';

		/*
	 This is a terrible temporary hack,
	 to fix layout issues with flex on iOS (chrome & safari)
	 Make sure to remove this when you modify this demo
	 */
		vm.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _RoutesConfig = __webpack_require__(6);

	angular.module('app.routes').config(_RoutesConfig.RoutesConfig);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RoutesConfig = RoutesConfig;
	function RoutesConfig($stateProvider, $urlRouterProvider) {

		var getView = function getView(viewName) {
			return './views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider.state('app', {
			abstract: true,
			views: {
				header: {
					templateUrl: getView('header')
				},
				footer: {
					templateUrl: getView('footer')
				},
				main: {}
			}
		}).state('app.landing', {
			url: '/',
			data: {},
			views: {
				'main@': {
					templateUrl: getView('landing')
				}
			}
		});
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ]);