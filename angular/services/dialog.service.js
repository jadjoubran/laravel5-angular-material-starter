export class DialogService {
    constructor($mdDialog) {
        'ngInject';

        this.$mdDialog = $mdDialog
    }

    fromTemplate(template, options) {
        if (!template) {
            return false;
        }

        if (!options) {
            options = {};
        }

        options.templateUrl = './views/dialogs/' + template + '/' + template + '.dialog.html'

        return this.$mdDialog.show(options);
    }

    hide(params) {
        return this.$mdDialog.hide(params);
    }

    cancel(){
        return this.$mdDialog.cancel();
    }

    alert(title, content, params) {
        let alert = this.$mdDialog.alert(params)
            .title(title)
            .content(content)
            .ariaLabel(content)
            .ok('Ok');

        this.$mdDialog.show(alert);
    }

    confirm(title, content, params) {
        let confirm = this.$mdDialog.confirm(params)
            .title(title)
            .content(content)
            .ariaLabel(content)
            .ok('Ok')
            .cancel('Cancel');

        return this.$mdDialog.show(confirm);
    }

    prompt(title, content, placeholder, params) {
        let prompt = this.$mdDialog.prompt(params)
            .title(title)
            .textContent(content)
            .placeholder(placeholder)
            .ariaLabel(placeholder)
            .ok('Ok')
            .cancel('Cancel');

        return this.$mdDialog.show(prompt);
    }
}
