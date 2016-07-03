ngDescribe({
    name: 'Test app-view component',
    modules: 'app',
    element: '<app-view></app-view>',
    http: {
        get: {
            '/img/icons/restful-api.svg': true,
            '/img/icons/json-webtoken.svg': true,
            '/img/icons/angular-generators.svg': true,
            '/img/icons/logo-grey.svg': true
        }
    },
    tests: function (deps) {

        it('basic test', () => {
            //
        });
    }
});
