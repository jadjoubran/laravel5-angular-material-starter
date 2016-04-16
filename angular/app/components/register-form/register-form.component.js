class RegisterFormController {
	constructor($auth, ToastService) {
		'ngInject';

		this.$auth = $auth;
		this.ToastService = ToastService;
	}

    $onInit(){
        this.name = '';
        this.email = '';
        this.password = '';
    }

	register() {
		let user = {
			name: this.name,
			email: this.email,
			password: this.password
		};

		this.$auth.signup(user)
			.then((response) => {
				//remove this if you require email verification
				this.$auth.setToken(response.data);

				this.ToastService.show('Successfully registered.');
			})
			.catch(this.failedRegistration.bind(this));
	}



	failedRegistration(response) {
		if (response.status === 422) {
			for (let error in response.data.errors) {
				return this.ToastService.error(response.data.errors[error][0]);
			}
		}
		this.ToastService.error(response.statusText);
	}
}

export const RegisterFormComponent = {
	templateUrl: './views/app/components/register-form/register-form.component.html',
	controller: RegisterFormController,
	controllerAs: 'vm',
	bindings: {}
}
