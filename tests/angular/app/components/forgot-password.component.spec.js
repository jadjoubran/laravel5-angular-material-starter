ngDescribe({
    name: 'Test forgot-password component',
    modules: 'app',
    inject: '$http',
    element: '<forgot-password></forgot-password>',
    http: {
        post: {
            '/api/auth/password/email': {
                data: true
            }
        }
    },
    tests: function(deps) {

        it('should request email verification successfully', () => {
            var component = deps.element.isolateScope().vm;

            component.email = 'email@localhost.com';
            component.submit();

            deps.http.flush();
        });
    }
});
