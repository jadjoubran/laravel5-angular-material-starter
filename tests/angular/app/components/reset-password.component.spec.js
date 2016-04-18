ngDescribe({
    name: 'Test reset-password component',
    modules: 'app',
    inject: '$http',
    element: '<reset-password></reset-password>',
    http: {
        get: {
            '/api/auth/password/verify': {
                data: true
            }
        },
        post: {
            '/api/auth/password/reset' : {
                data: true
            }
        }
    },
    tests: function(deps) {

        it('should expect verification on init', () => {
            //
        });

        it('should submit password reset successfully', () => {
            var component = deps.element.isolateScope().vm;

            component.submit()

            deps.http.flush();
        });
    }
});
