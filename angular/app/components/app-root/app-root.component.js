class AppRootController {
    constructor($mdToast, ToastService, $window) {
        'ngInject';

        this.$window = $window;
        this.$mdToast = $mdToast;
        this.ToastService = ToastService;
    }

    $onInit() {
        this.registerServiceWorker();
        this.checkForNewerVersions();
    }

    registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            return false;
        }
        navigator.serviceWorker.register('/service-worker.js')
            .then(this.handleRegistration.bind(this));
    }

    handleRegistration(registration) {
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (!navigator.serviceWorker.controller) {
                        this.ToastService.show('App is ready for offline use.');
                    }
                }
            }
        }
    }

    checkForNewerVersions() {
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.onstatechange = (e) => {

                if (e.target.state === 'redundant') {
                    let toast = this.$mdToast.simple()
                        .content('A newer version of this site is available.')
                        .position(this.ToastService.position)
                        .action('Refresh')
                        .hideDelay(this.ToastService.delay);

                    this.$mdToast.show(toast).then(() => {
                        this.$window.location.reload();
                    });
                }
            };
        }
    }
}

export const AppRootComponent = {
    templateUrl: './views/app/components/app-root/app-root.component.html',
    controller: AppRootController,
    controllerAs: 'vm',
    bindings: {}
}
