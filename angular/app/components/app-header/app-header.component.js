class AppHeaderController{
    constructor($sce){
        'ngInject';

        this.$sce = $sce;
    }

    $onInit(){
        //defer iframe loading
        let url = 'https://ghbtns.com/github-btn.html?user=jadjoubran&repo=laravel5-angular-material-starter&type=star&count=true&size=large';
        this.githubWidget = this.$sce.trustAsResourceUrl(url);
    }
}

export const AppHeaderComponent = {
    templateUrl: './views/app/components/app-header/app-header.component.html',
    controller: AppHeaderController,
    controllerAs: 'vm',
    bindings: {}
}
