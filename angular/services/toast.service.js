export class ToastService {
	constructor($mdToast) {
		'ngInject';

		this.$mdToast = $mdToast;

		this.delay = 6000;
		this.position = 'top right';
		this.action = 'OK';
	}

    fromTemplate(template, options) {
        if (!template) {
            return false;
        }

        if (!options) {
            options = {};
        }

        options.templateUrl = './views/toasts/' + template + '/' + template + '.toast.html';

        return this.$mdToast.show(options);
    }

    hide(params){
        return this.$mdToast.hide(params);
    }

	show(content, params) {
		if (!content) {
			return false;
		}

		return this.$mdToast.show(
			this.$mdToast.simple(params)
			.content(content)
			.position(this.position)
			.action(this.action)
			.hideDelay(this.delay)
		);
	}

	error(content, params) {
		if (!content) {
			return false;
		}

		return this.$mdToast.show(
			this.$mdToast.simple(params)
			.content(content)
			.position(this.position)
			.theme('warn')
			.action(this.action)
			.hideDelay(this.delay)
		);
	}
}
