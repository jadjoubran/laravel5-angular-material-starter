ngDescribe({
    name: 'Test register-form component',
    modules: 'app',
    element: '<register-form></register-form>',
    tests: function (deps) {
        it('Should have name, email, password inputs', () => {
            var inputs = deps.element.find('input');
            expect(inputs.length).toBe(3);
            var name = deps.element.find('input')[0];
            expect(name.attributes['type'].value).toBe('text');
            var email = deps.element.find('input')[1];
            expect(email.attributes['type'].value).toBe('email');
            var passsword = deps.element.find('input')[2];
            expect(passsword.attributes['type'].value).toBe('password');
        });
    }
});