class ResetPasswordController {
    constructor(API, ToastService, $state) {
        'ngInject';

        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService;

        this.password = '';
        this.password_confirmation = '';
        this.isValidCode = false;

        this.validateCode();
    }

    validateCode() {
        let email = this.$state.params.email;
        let code = this.$state.params.code;

        this.API.all('auth/reset').get('check', {
            email, code
        }).then(() => {
            this.isValidCode = true;
        });
    }

    reset() {
        let data = {
            email: this.$state.params.email,
            code: this.$state.params.code,
            password: this.password,
            password_confirmation: this.password_confirmation
        };

        this.API.all('auth/reset').post(data).then(() => {
            this.ToastService.show('Password successfully changed');
            this.$state.go('app.login');
        });
    }
}

export const ResetPasswordComponent = {
    templateUrl: './views/app/components/reset-password/reset-password.component.html',
    controller: ResetPasswordController,
    controllerAs: 'vm',
    bindings: {}
}
