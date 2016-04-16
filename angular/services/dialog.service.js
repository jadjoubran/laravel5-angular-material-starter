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

    hide() {
        return this.$mdDialog.hide();
    }

    alert(title, content) {
        let alert = this.$mdDialog.alert()
            .title(title)
            .content(content)
            .ariaLabel(content)
            .ok('Ok');

        this.$mdDialog.show(alert);
    }

    confirm(title, content) {
        let confirm = this.$mdDialog.confirm()
            .title(title)
            .content(content)
            .ariaLabel(content)
            .ok('Ok')
            .cancel('Cancel');

        return this.$mdDialog.show(confirm);
    }

    prompt(title, content, placeholder) {
        let prompt = this.$mdDialog.prompt()
            .title(title)
            .textContent(content)
            .placeholder(placeholder)
            .ariaLabel(placeholder)
            .ok('Ok')
            .cancel('Cancel');

        return this.$mdDialog.show(prompt);
    }
}
