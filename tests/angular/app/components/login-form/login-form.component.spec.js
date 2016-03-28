ngDescribe({
    name: 'Test login-form component',
    modules: 'app',
    element: '<login-form></login-form>',
    tests: function (deps) {

        it('Should have email and password inputs', () => {
            var inputs = deps.element.find('input');
            expect(inputs.length).toBe(2);
            var email = deps.element.find('input')[0];
            expect(email.attributes['type'].value).toBe('email');
            var passsword = deps.element.find('input')[1];
            expect(passsword.attributes['type'].value).toBe('password');
        });
    }
});
