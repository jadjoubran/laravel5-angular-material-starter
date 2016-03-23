class LoginFormController {
	constructor($auth) {
		'ngInject';

		this.$auth = $auth;

		this.email = '';
		this.password = '';
	}

	login() {
		var user = {
			email: this.email,
			password: this.password
		};

		this.$auth.login(user)
			.then((response) => {
				//save token in localStorage
				this.$auth.setToken(response.data);

				//
			});
	}
}

export const LoginFormComponent = {
	templateUrl: './views/app/components/login-form/login-form.component.html',
	controller: LoginFormController,
	controllerAs: 'vm',
	bindings: {}
}
