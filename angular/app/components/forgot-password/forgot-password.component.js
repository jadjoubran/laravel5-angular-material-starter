class ForgotPasswordController {
    constructor(API, ToastService, $state) {
        'ngInject';

        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService;
    }

    $onInit(){
        this.email = '';
    }

    submit() {
        this.API.all('auth/password/email').post({
            email: this.email
        }).then(() => {
            this.ToastService.show(`Please check your email for instructions on how to reset your password.`);
            this.$state.go('app.landing');
        });
    }
}

export const ForgotPasswordComponent = {
    templateUrl: './views/app/components/forgot-password/forgot-password.component.html',
    controller: ForgotPasswordController,
    controllerAs: 'vm',
    bindings: {}
}
