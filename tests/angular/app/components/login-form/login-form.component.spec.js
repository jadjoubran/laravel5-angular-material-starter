ngDescribe({
    name: 'Test login-form component',
    modules: 'app',
    tests: function ($rootScope, $compile) {
        var element;
        var scope;
        beforeEach(inject(function($rootScope, $compile){
            scope = $rootScope.$new();
            element = angular.element('<login-form></login-form>');
            element = $compile(element)(scope);
            scope.$apply();
        }));
        it('Should have email and password inputs', () => {
            var inputs =element.find('input');
            expect(inputs.length).toBe(2);
            var email = element.find('input')[0];
            expect(email.attributes['type'].value).toBe('email');
            var passsword = element.find('input')[1];
            expect(passsword.attributes['type'].value).toBe('password');
        });
    }
});