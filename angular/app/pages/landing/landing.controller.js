export class LandingController {
	constructor() {
		'ngInject';

		this.laravel_description = 'Response macros integrated with your Angular app';
		this.angular_description = 'Query your API without worrying about validations';

		/*
		This is a terrible temporary hack,
		to fix layout issues with flex on iOS (chrome & safari)
		Make sure to remove this when you modify this demo
		*/
		this.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	}
}
