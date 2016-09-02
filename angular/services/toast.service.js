export class ToastService {
	constructor($mdToast) {
		'ngInject';

		this.$mdToast = $mdToast;

		this.delay = 6000;
		this.position = 'top right';
		this.action = 'OK';
	}

	show(content) {
		if (!content) {
			return false;
		}

		return this.$mdToast.show(
			this.$mdToast.simple()
			.content(content)
			.position(this.position)
			.action(this.action)
			.hideDelay(this.delay)
		);
	}

	error(content) {
		if (!content) {
			return false;
		}

		return this.$mdToast.show(
			this.$mdToast.simple()
			.content(content)
			.position(this.position)
			.theme('warn')
			.action(this.action)
			.hideDelay(this.delay)
		);
	}
}
