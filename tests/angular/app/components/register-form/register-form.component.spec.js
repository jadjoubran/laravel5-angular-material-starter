ngDescribe({
    name: 'Test register-form component',
    modules: 'app',
    tests: function ($rootScope, $compile) {
        var element;

        beforeEach(inject(function($rootScope, $compile){
            var scope  = $rootScope.$new();
            element = angular.element('<register-form></register-form>');
            element = $compile(element)(scope);
            scope.$apply();
        }));
        
        it('Should have name, email, password inputs', () => {
            var inputs =element.find('input');
            expect(inputs.length).toBe(3);
            var name = element.find('input')[0];
            expect(name.attributes['type'].value).toBe('text');
            var email = element.find('input')[1];
            expect(email.attributes['type'].value).toBe('email');
            var passsword = element.find('input')[2];
            expect(passsword.attributes['type'].value).toBe('password');
        });
    }
});