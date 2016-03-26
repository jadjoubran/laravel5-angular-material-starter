ngDescribe({
    name: 'Test routes configuration',
    modules: 'app',
    tests: function ($location,$rootScope,$state) {
        function goTo(url) {
            $location.path(url);
            $rootScope.$digest();
        }
        beforeEach(inject(function (_$location_,_$state_, $templateCache, _$rootScope_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $location = _$location_;
        }));
        describe('path', function () {
            describe('when empty', function () {
                it('should go to the app.landing state', function () {
                    goTo('');
                    expect($state.$current.name).toEqual('app.landing');
                });
            });
            describe('when /landing', function () {
                it('should go to the app.landing state', function () {
                    goTo('/landing');
                    expect($state.$current.name).toEqual('app.landing');
                });
            });
            describe('when /login', function () {
                it('should go to the app.landing state', function () {
                    goTo('/login');
                    expect($state.$current.name).toEqual('app.login');
                });
            });
            describe('when /register', function () {
                it('should go to the app.landing state', function () {
                    goTo('/register');
                    expect($state.$current.name).toEqual('app.register');
                });
            });
        });
    }
});