class ResetPasswordController {
    constructor(API, ToastService, $state) {
        'ngInject';

        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService;
    }

    $onInit(){
        this.password = '';
        this.password_confirmation = '';
        this.isValidToken = false;

        this.verifyToken();
    }

    verifyToken() {
        let email = this.$state.params.email;
        let token = this.$state.params.token;

        this.API.all('auth/password').get('verify', {
            email, token
        }).then(() => {
            this.isValidToken = true;
        }, () => {
            this.$state.go('app.landing');
        });
    }

    submit() {
        let data = {
            email: this.$state.params.email,
            token: this.$state.params.token,
            password: this.password,
            password_confirmation: this.password_confirmation
        };

        this.API.all('auth/password/reset').post(data).then(() => {
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
