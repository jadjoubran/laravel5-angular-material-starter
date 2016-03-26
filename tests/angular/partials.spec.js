ngDescribe({
    name: 'Test footer partial',
    modules: 'app',
    tests: function ($templateCache) {
        it('Should contain the footer partial', () => {
            let footer = $templateCache.get('./views/app/pages/footer/footer.page.html');
            expect(footer).toBe('<md-content class="Page-Container Footer iOS-hack" layout-align="center center">\n' +
                '<md-icon md-svg-src="/img/icons/logo-grey.svg" class="Footer-logo"></md-icon>\n' +
                '<br/>\n' +
                '<br/>\n' +
                '<div class="Footer-text">\n' +
                '	An open source project by <a href="https://github.com/jadjoubran" class="Footer-link" target="_blank">Jad Joubran</a>.\n' +
                '	Design by <a href="http://nicolesaidy.com" class="Footer-link" target="_blank">Nicole Saidy</a>\n' +
                '</div>\n' +
                '<div class="Footer-text">\n' +
                '	&copy; 2016 Laravel Angular Material Starter\n' +
                '</div>\n' +
                '</md-content>\n' +
                '');
    });
    }
});
