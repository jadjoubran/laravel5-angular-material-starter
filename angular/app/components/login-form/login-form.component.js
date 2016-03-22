class LoginFormController{
    constructor(){
        'ngInject';

        this.email = '';
        this.password = '';
    }
}

export const LoginFormComponent = {
    templateUrl: './views/app/components/login-form/login-form.component.html',
    controller: LoginFormController,
    controllerAs: 'vm',
    bindings: {}
}


