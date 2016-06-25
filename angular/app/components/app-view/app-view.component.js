class AppViewController {
    constructor($mdToast, ToastService, $window) {
        'ngInject';

        this.$window = $window;
        this.$mdToast = $mdToast;
        this.ToastService = ToastService;
    }

    $onInit() {
        this.showReadyForOfflineUse();
        this.checkForNewerVersions();
    }

    showReadyForOfflineUse() {
        //cannot use arrow function
        let toastService = this.ToastService;

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            navigator.serviceWorker.controller.addEventListener('statechange', function() {
                if (this.state === 'activated') {
                    toastService.show('App is ready for offline use.');
                }
            });
        });
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

export const AppViewComponent = {
    templateUrl: './views/app/components/app-view/app-view.component.html',
    controller: AppViewController,
    controllerAs: 'vm',
    bindings: {}
}
