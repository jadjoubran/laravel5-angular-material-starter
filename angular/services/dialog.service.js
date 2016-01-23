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

		options.templateUrl = './views/dialogs/' + template + '/' + template + '.html'

		return this.$mdDialog.show(options);
	}

	hide() {
		return this.$mdDialog.hide();
	}

	alert(title, content) {
		this.$mdDialog.show(
			this.$mdDialog.alert()
			.title(title)
			.content(content)
			.ok('Ok')
		);
	}

	confirm(title, content) {
		return this.$mdDialog.show(
			this.$mdDialog.confirm()
			.title(title)
			.content(content)
			.ok('Ok')
			.cancel('Cancel')
		);
	}
}
