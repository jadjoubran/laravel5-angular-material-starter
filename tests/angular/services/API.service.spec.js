ngDescribe({
    name: 'Test API service',
    modules: 'app',
    tests: function (API) {
        var httpBackend, q, scope;
        beforeEach(inject(function( _$httpBackend_, $q, $rootScope) {
            q = $q;
            httpBackend=_$httpBackend_;
            scope = $rootScope.$new();
        }));
        function getValue(promise,q,scope){
                var defer = q.defer();
                var unproxiedPromise;
                promise.then(function(value){
                    unproxiedPromise = value;
                });
                defer.resolve();
                scope.$apply();
                return unproxiedPromise;

        }
        
        describe('Api service will perform get',() =>{

            it('from /api/test' ,()=>{
                spyOn(API, 'all').and.callThrough();

                var mockToReturn = {
                    someProp: 'someValue',
                    someOtherProp: 'someOtherValue'
                };

                var someParameter = 'someParameter';
                httpBackend.expectGET('/api/test') .respond(mockToReturn);
                var newRes = API.all('test').get('');
                httpBackend.flush();
                newRes = getValue(newRes, q, scope);

                expect(newRes.someProp).toEqual('someValue');

                expect(newRes.someOtherProp).toEqual('someOtherValue');
            })
        });
    }
});