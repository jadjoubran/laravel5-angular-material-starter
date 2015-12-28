(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/header/header.html',
    '<md-content class="Page-Container DemoHeader" ng-controller="HeaderController as vm">\n' +
    '	<div layout="row">\n' +
    '		<div flex="80" flex-offset="10">\n' +
    '			<div class="DemoHeader-container">\n' +
    '				<div layout="row" layout-align="space-between">\n' +
    '					<img src="img/laravel-angular-logo.svg" class="DemoHeader-logo"/>\n' +
    '					<div>\n' +
    '						<a class="DemoHeader-link" href="https://laravel-angular.readme.io" target="_blank">Docs</a>\n' +
    '						<a class="DemoHeader-link" href="">Screencasts</a>\n' +
    '						<a class="DemoHeader-link" href="https://github.com/jadjoubran/laravel5-angular-material-starter" target="_blank">Github</a>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/footer/footer.html',
    '<md-content class="Page-Container Footer" ng-controller="FooterController as vm" layout-align="center center">\n' +
    '	<md-icon md-svg-src="/img/icons/logo.svg"></md-icon>\n' +
    '	<br/>\n' +
    '	<br/>\n' +
    '	<div>\n' +
    '		An open source project by <a href="https://github.com/jadjoubran" class="Footer-link" target="_blank"><strong>Jad Joubran</strong></a>.\n' +
    '		Design by <a href="https://www.linkedin.com/in/nicolesaidy" class="Footer-link" target="_blank"><strong>Nicole Saidy</strong></a>\n' +
    '	</div>\n' +
    '	<br/>\n' +
    '	<div>\n' +
    '		&copy; 2016 Laravel Angular Material Starter\n' +
    '	</div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/landing/landing.html',
    '<div class="Page-Container Landing" ng-controller="LandingController as vm">\n' +
    '	<div layout="column" class="Landing-cover" layout-align="center center">\n' +
    '		<div class="md-body-1 Landing-subtitle">A starter project for Laravel & Angular using Angular Material.</div>\n' +
    '		<h1 class="md-display-1 Landing-heading">Laravel Angular Material Starter</h1>\n' +
    '		<md-button class="md-raised md-large Landing-getStarted" href="https://laravel-angular.readme.io/docs/install" target="_blank">Get Started</md-button>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="Landing-laravelAngular">\n' +
    '		<div class="Landing-ampersand">&amp;</div>\n' +
    '		<div layout="row">\n' +
    '			<div flex="50" class="Landing-laravel" layout-align="center center">\n' +
    '				<h2 class="md-display-1 Landing-laravelAngular-title">Laravel</h2>\n' +
    '				<div class="md-body-1 Landing-laravelAngular-subtitle">{{vm.laravel_description}}</div>\n' +
    '				<br/>\n' +
    '				<div class="DemoCode">\n' +
    '					<span class="DemoCode-operator">&lt;?php</span><br/>\n' +
    '					<br/>\n' +
    '					<span class="DemoCode-highlight">class</span> PostsController <span class="DemoCode-operator">{</span><br/>\n' +
    '					<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">public</span> <span class="DemoCode-secondary">function</span> get()<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-operator">{</span><br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">$posts</span> = App\\Post<span class="DemoCode-operator">::</span>get();<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-secondary">return</span> response<span class="DemoCode-operator">()</span>-&gt;success(compact(<span class="DemoCode-string">\'posts\'</span>));<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-operator">}</span><br/>\n' +
    '					<span class="DemoCode-operator">}</span>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			<div flex="50" class="Landing-angular" layout-align="center center">\n' +
    '				<h2 class="md-display-1 Landing-laravelAngular-title">Angular</h2>\n' +
    '				<div class="md-body-1 Landing-laravelAngular-subtitle">{{vm.angular_description}}</div>\n' +
    '				<br/>\n' +
    '				<div class="DemoCode">\n' +
    '					<span class="DemoCode-secondary">function</span> <span class="DemoCode-highlight">LandingController</span><span class="DemoCode-operator">(</span>API<span class="DemoCode-operator">)</span> <span class="DemoCode-operator">{</span><br/>\n' +
    '					<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-secondary">var</span> <span class="DemoCode-highlight">getPosts</span> = <span class="DemoCode-secondary">function</span><span class="DemoCode-operator">(){</span><br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;API.all(<span class="DemoCode-string">\'posts\'</span>).get<span class="DemoCode-operator">()</span>.then(<span class="DemoCode-secondary">function</span>(response){<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">this</span>.posts = <span class="DemoCode-highlight">response.data</span>;<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-operator">});</span><br/>\n' +
    '					<span class="DemoCode-operator">}</span>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="Landing-features" layout-align="center center">\n' +
    '		<h1 class="md-display-1">Laravel Angular Material Starter</h1>\n' +
    '		<div class="md-body-1">\n' +
    '			Laravel Angular Material Starter provides you with many features required when working with Laravel & Angular. Such as Json Web Token authentication, Angular generators and many more..\n' +
    '		</div>\n' +
    '		<br/>\n' +
    '		<div>List of features coming soon..</div>\n' +
    '		<br/>\n' +
    '		<br/>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
})();
