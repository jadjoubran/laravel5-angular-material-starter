(function() {
	"use strict";

	angular.module('app.services').factory('API', function(Restangular, ToastService, $localStorage) {

		//content negotiation
		var headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/x.laravel.v1+json'
		};

		return Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer
				.setBaseUrl('/api/')
				.setDefaultHeaders(headers)
				.setErrorInterceptor(function(response) {
					if (response.status === 422) {
						for (var error in response.data.errors) {
							return ToastService.error(response.data.errors[error][0]);
						}
					}
				})
				.addResponseInterceptor(function (response, operation, what) {
                    if (operation === 'getList') {
                        var newResponse = response.data[what];
                        newResponse.error = response.error;
                        return newResponse;
                    }
                    return response;
                })
				.addFullRequestInterceptor(function(element, operation, what, url, headers) {
					if ($localStorage.jwt) {
						headers.Authorization = 'Bearer ' + $localStorage.jwt;
					}
				});
		});
	});

})();
