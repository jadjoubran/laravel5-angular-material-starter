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

	__webpack_require__(5);

	__webpack_require__(7);

	__webpack_require__(9);

	__webpack_require__(16);

	__webpack_require__(17);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _loading_bar = __webpack_require__(3);

	var _theme = __webpack_require__(4);

	angular.module('app.config').config(_loading_bar.LoadingBar).config(_theme.ThemeConfig);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	LoadingBar.$inject = ["cfpLoadingBarProvider"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LoadingBar = LoadingBar;
	function LoadingBar(cfpLoadingBarProvider) {
		'ngInject';

		cfpLoadingBarProvider.includeSpinner = false;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	ThemeConfig.$inject = ["$mdThemingProvider"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ThemeConfig = ThemeConfig;
	function ThemeConfig($mdThemingProvider) {
		'ngInject';
		/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */

		$mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('grey').warnPalette('red');
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _landing = __webpack_require__(6);

	angular.module('app.controllers').controller('LandingController', _landing.LandingController);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LandingController = exports.LandingController = function LandingController() {
		'ngInject';

		_classCallCheck(this, LandingController);

		this.laravel_description = 'Response macros integrated with your Angular app';
		this.angular_description = 'Query your API without worrying about validations';

		/*
	 This is a terrible temporary hack,
	 to fix layout issues with flex on iOS (chrome & safari)
	 Make sure to remove this when you modify this demo
	 */
		this.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _RoutesConfig = __webpack_require__(8);

	angular.module('app.routes').config(_RoutesConfig.RoutesConfig);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RoutesConfig = RoutesConfig;
	function RoutesConfig($stateProvider, $urlRouterProvider) {
		'ngInject';

		var getView = function getView(viewName) {
			return './views/app/pages/' + viewName + '/' + viewName + '.html';
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _capitalize = __webpack_require__(10);

	var _human_readable = __webpack_require__(11);

	var _truncate_characters = __webpack_require__(12);

	var _truncate_words = __webpack_require__(13);

	var _trust_html = __webpack_require__(14);

	var _ucfirst = __webpack_require__(15);

	angular.module('app.filters').filter('capitalize', _capitalize.CapitalizeFilter).filter('humanReadable', _human_readable.HumanReadableFilter).filter('truncateCharacters', _truncate_characters.TruncatCharactersFilter).filter('truncateWords', _truncate_words.TruncateWordsFilter).filter('trustHtml', _trust_html.TrustHtmlFilter).filter('ucfirst', _ucfirst.UcFirstFilter);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CapitalizeFilter = CapitalizeFilter;
	function CapitalizeFilter() {
		return function (input) {
			return input ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}) : '';
		};
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.HumanReadableFilter = HumanReadableFilter;
	function HumanReadableFilter() {
		return function humanize(str) {
			if (!str) {
				return '';
			}
			var frags = str.split('_');
			for (var i = 0; i < frags.length; i++) {
				frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
			}
			return frags.join(' ');
		};
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TruncatCharactersFilter = TruncatCharactersFilter;
	function TruncatCharactersFilter() {
		return function (input, chars, breakOnWord) {
			if (isNaN(chars)) {
				return input;
			}
			if (chars <= 0) {
				return '';
			}
			if (input && input.length > chars) {
				input = input.substring(0, chars);

				if (!breakOnWord) {
					var lastspace = input.lastIndexOf(' ');
					// Get last space
					if (lastspace !== -1) {
						input = input.substr(0, lastspace);
					}
				} else {
					while (input.charAt(input.length - 1) === ' ') {
						input = input.substr(0, input.length - 1);
					}
				}
				return input + '...';
			}
			return input;
		};
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TruncateWordsFilter = TruncateWordsFilter;
	function TruncateWordsFilter() {
		return function (input, words) {
			if (isNaN(words)) {
				return input;
			}
			if (words <= 0) {
				return '';
			}
			if (input) {
				var inputWords = input.split(/\s+/);
				if (inputWords.length > words) {
					input = inputWords.slice(0, words).join(' ') + '...';
				}
			}
			return input;
		};
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TrustHtmlFilter = TrustHtmlFilter;
	function TrustHtmlFilter($sce) {
		return function (html) {
			return $sce.trustAsHtml(html);
		};
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.UcFirstFilter = UcFirstFilter;
	function UcFirstFilter() {
		return function (input) {
			if (!input) {
				return null;
			}
			return input.substring(0, 1).toUpperCase() + input.substring(1);
		};
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _API = __webpack_require__(18);

	var _dialog = __webpack_require__(19);

	var _toast = __webpack_require__(20);

	angular.module('app.services').factory('API', _API.APIService).factory('DialogService', _dialog.DialogService).factory('ToastService', _toast.ToastService);

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var APIService = exports.APIService = ["Restangular", "ToastService", "$localStorage", function APIService(Restangular, ToastService, $localStorage) {
		'ngInject';
		//content negotiation

		_classCallCheck(this, APIService);

		var headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/x.laravel.v1+json'
		};

		return Restangular.withConfig(function (RestangularConfigurer) {
			RestangularConfigurer.setBaseUrl('/api/').setDefaultHeaders(headers).setErrorInterceptor(function (response) {
				if (response.status === 422) {
					for (var error in response.data.errors) {
						return ToastService.error(response.data.errors[error][0]);
					}
				}
			}).addFullRequestInterceptor(function (element, operation, what, url, headers) {
				if ($localStorage.jwt) {
					headers.Authorization = 'Bearer ' + $localStorage.jwt;
				}
			});
		});
	}];

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DialogService = exports.DialogService = function () {
		DialogService.$inject = ["$mdDialog"];
		function DialogService($mdDialog) {
			'ngInject';

			_classCallCheck(this, DialogService);

			this.$mdDialog = $mdDialog;
		}

		_createClass(DialogService, [{
			key: 'fromTemplate',
			value: function fromTemplate(template, options) {
				if (!template) {
					return false;
				}

				if (!options) {
					options = {};
				}

				options.templateUrl = './views/dialogs/' + template + '/' + template + '.html';

				return this.$mdDialog.show(options);
			}
		}, {
			key: 'hide',
			value: function hide() {
				return this.$mdDialog.hide();
			}
		}, {
			key: 'alert',
			value: function alert(title, content) {
				this.$mdDialog.show(this.$mdDialog.alert().title(title).content(content).ok('Ok'));
			}
		}, {
			key: 'confirm',
			value: function confirm(title, content) {
				return this.$mdDialog.show(this.$mdDialog.confirm().title(title).content(content).ok('Ok').cancel('Cancel'));
			}
		}]);

		return DialogService;
	}();

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ToastService = exports.ToastService = function () {
		ToastService.$inject = ["$mdToast"];
		function ToastService($mdToast) {
			'ngInject';

			_classCallCheck(this, ToastService);

			this.$mdToast = $mdToast;

			this.delay = 6000;
			this.position = 'top right';
			this.action = 'OK';
		}

		_createClass(ToastService, [{
			key: 'show',
			value: function show(content) {
				if (!content) {
					return false;
				}

				return this.$mdToast.show(this.$mdToast.simple().content(content).position(this.position).action(this.action).hideDelay(this.delay));
			}
		}, {
			key: 'error',
			value: function error(content) {
				if (!content) {
					return false;
				}

				return this.$mdToast.show(this.$mdToast.simple().content(content).position(this.position).theme('warn').action(this.action).hideDelay(this.delay));
			}
		}]);

		return ToastService;
	}();

/***/ }
/******/ ]);