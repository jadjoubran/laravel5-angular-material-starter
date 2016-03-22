class RegisterFormController{
    constructor(){
        'ngInject';

        this.name = '';
        this.email = '';
        this.password = '';
    }
}

export const RegisterFormComponent = {
    templateUrl: './views/app/components/register-form/register-form.component.html',
    controller: RegisterFormController,
    controllerAs: 'vm',
    bindings: {}
}


