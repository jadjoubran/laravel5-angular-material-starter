export class APIService {
	constructor(Restangular, ToastService, $window) {
		'ngInject';
		//content negotiation
		let headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/x.laravel.v1+json'
		};

		return Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer
				.setBaseUrl('/api/')
				.setDefaultHeaders(headers)
				.setErrorInterceptor(function(response) {
					if (response.status === 422 || response.status === 401) {
						for (let error in response.data.errors) {
							return ToastService.error(response.data.errors[error][0]);
						}
					}
                    if (response.status === 500) {
                      return ToastService.error(response.statusText)
                    }
				})
				.addFullRequestInterceptor(function(element, operation, what, url, headers) {
					let token = $window.localStorage.satellizer_token;
					if (token) {
						headers.Authorization = 'Bearer ' + token;
					}
				});
		});
	}
}
