(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/footer/footer.html',
    '<md-content class="Page-Container Footer" ng-controller="FooterController as vm" layout-align="center center">\n' +
    '<md-icon md-svg-src="/img/icons/logo-grey.svg" class="Footer-logo"></md-icon>\n' +
    '<br/>\n' +
    '<br/>\n' +
    '<div class="Footer-text">\n' +
    '	An open source project by <a href="https://github.com/jadjoubran" class="Footer-link" target="_blank">Jad Joubran</a>.\n' +
    '	Design by <a href="https://www.linkedin.com/in/nicolesaidy" class="Footer-link" target="_blank">Nicole Saidy</a>\n' +
    '</div>\n' +
    '<div class="Footer-text">\n' +
    '	&copy; 2016 Laravel Angular Material Starter\n' +
    '</div>\n' +
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
  $templateCache.put('./views/app/header/header.html',
    '<md-content class="Page-Container DemoHeader" ng-controller="HeaderController as vm">\n' +
    '	<div layout="row">\n' +
    '		<div flex="90" flex-offset="5" class="DemoHeader-container">\n' +
    '			<div layout="row" layout-align="space-between">\n' +
    '				<img src="img/icons/logo.svg" class="DemoHeader-logo"/>\n' +
    '				<div layout="row" layout-align="center stretch" hide-xs>\n' +
    '					<a class="DemoHeader-link md-subhead" href="https://laravel-angular.readme.io" target="_blank">Docs</a>\n' +
    '					<a class="DemoHeader-link md-subhead" href="https://www.youtube.com/channel/UCTiRXlOapSWfu02rtOdaGvA" target="_blank">Screencasts</a>\n' +
    '					<a class="DemoHeader-link md-subhead" href="https://github.com/jadjoubran/laravel5-angular-material-starter" target="_blank">Github</a>\n' +
    '					<a class="DemoHeader-link md-subhead" ui-sref="app.login">Login</a>\n' +
    '					<a class="DemoHeader-link md-subhead" ui-sref="app.register">Register</a>\n' +
    '					<a class="DemoHeader-link md-subhead" ui-sref="app.loggedin">Protected</a>\n' +
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
  $templateCache.put('./views/app/landing/landing.html',
    '<div class="Page-Container Landing" ng-controller="LandingController as vm" ng-class="{\'iOS-hack\': vm.iOS}">\n' +
    '	<div layout="column" class="Landing-cover" layout-align="center center">\n' +
    '		<div class="md-headline Landing-subtitle">Build your next powerful web app</div>\n' +
    '		<h1 class="md-display-3 Landing-heading"><strong>laravel angular</strong> <span class="Landing-headingLight">material starter</span></h1>\n' +
    '		<md-button class="md-raised md-large Landing-getStarted" href="https://laravel-angular.readme.io/docs/install" target="_blank">Get Started</md-button>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="Landing-laravelAngular">\n' +
    '		<div class="Landing-ampersand" hide show-gt-sm>&amp;</div>\n' +
    '		<div layout="column" layout-gt-sm="row">\n' +
    '			<div flex="50" class="Landing-laravel" layout-align="center center">\n' +
    '				<h2 class="md-display-2 Landing-laravelAngular-title">Laravel</h2>\n' +
    '				<div class="md-title Landing-laravelAngular-subtitle">{{vm.laravel_description}}</div>\n' +
    '				<br/>\n' +
    '				<div class="DemoCode">\n' +
    '					<span class="DemoCode-operator">&lt;?php</span><br/>\n' +
    '					<br/>\n' +
    '					<span class="DemoCode-highlight">class</span> <span class="DemoCode-secondary">PostsController</span><br/>\n' +
    '					{<br/>\n' +
    '					<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;public <span class="DemoCode-secondary">function</span> <span class="DemoCode-highlight">get</span>()<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;{<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-secondary">$posts</span> = <span class="DemoCode-highlight">App</span>\\<span class="DemoCode-highlight">Post</span>::<span class="DemoCode-secondary">get</span>();<br/>\n' +
    '					<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">return</span> <span class="DemoCode-secondary">response</span>()<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt;<span class="DemoCode-secondary">success</span>(compact(<span class="DemoCode-string">\'posts\'</span>));<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>\n' +
    '					}\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			<div flex="50" class="Landing-angular" layout-align="center center">\n' +
    '				<h2 class="md-display-2 Landing-laravelAngular-title">Angular</h2>\n' +
    '				<div class="md-title Landing-laravelAngular-subtitle">{{vm.angular_description}}</div>\n' +
    '				<br/>\n' +
    '				<div class="DemoCode">\n' +
    '					(<span class="DemoCode-secondary">function</span>(){<br/>\n' +
    '					<span class="DemoCode-string">"use strict"</span>;<br/><br/>\n' +
    '					<span class="DemoCode-secondary">function</span> <span class="DemoCode-highlight">LandingController</span>(API) {<br/>\n' +
    '					<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">this</span>.<span class="DemoCode-highlight">getPosts</span> = <span class="DemoCode-secondary">function</span>(){<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;API.all(<span class="DemoCode-string">\'posts\'</span>).get()<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span class="DemoCode-secondary">function</span>(response){<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">this</span>.posts = <span class="DemoCode-highlight">response.data</span>;<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br/>\n' +
    '					&nbsp;&nbsp;&nbsp;&nbsp;}<br/>\n' +
    '					<br/>\n' +
    '					})();\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="Landing-features" layout-align="center center">\n' +
    '		<h1 class="md-display-2 Landing-featuresMainTitle">Laravel Angular Material Starter</h1>\n' +
    '		<div class="md-title Landing-featuresMainDescription">\n' +
    '			The right features to get you started\n' +
    '		</div>\n' +
    '		<br/>\n' +
    '		<div>\n' +
    '			<div layout="column" layout-gt-sm="row" layout-align="space-between">\n' +
    '				<div flex="100" flex-gt-sm="33">\n' +
    '					<div class="Landing-featuresEntry Landing-featuresEntry--restful">\n' +
    '						<md-icon md-svg-src="/img/icons/restful-api.svg" class="Landing-featuresEntry-icon"></md-icon>\n' +
    '					</div>\n' +
    '					<div class="md-headline Landing-featuresTitle">RESTful API</div>\n' +
    '					<div class="md-subhead Landing-featuresDescription">Build consistent REST APIs and call them fluently using JavaScript, without having to worry about validation errors</div>\n' +
    '				</div>\n' +
    '				<div flex="33">\n' +
    '					<div class="Landing-featuresEntry Landing-featuresEntry--jwt">\n' +
    '						<md-icon md-svg-src="/img/icons/json-webtoken.svg" class="Landing-featuresEntry-icon"></md-icon>\n' +
    '					</div>\n' +
    '					<div class="md-headline Landing-featuresTitle">Json Web Token Authentication</div>\n' +
    '					<div class="md-subhead Landing-featuresDescription">Get an out-of-the-box JWT Authentication in your app that allows you to authenticate users on the fly</div>\n' +
    '				</div>\n' +
    '				<div flex="33">\n' +
    '					<div class="Landing-featuresEntry Landing-featuresEntry--generators">\n' +
    '						<md-icon md-svg-src="/img/icons/angular-generators.svg" class="Landing-featuresEntry-icon"></md-icon>\n' +
    '					</div>\n' +
    '					<div class="md-headline Landing-featuresTitle">Angular Generators</div>\n' +
    '					<div class="md-subhead Landing-featuresDescription">Generate angular features, dialogs, directives, services, filters & configs just like you\'re used to</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<br/>\n' +
    '		<br/>\n' +
    '	</div>\n' +
    '</div>\n' +
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
  $templateCache.put('./views/app/login/login.html',
    '<md-content class="Login" ng-controller="LoginFormController as vm">\n' +
    '	<h2 class="text-center">Log in</h2>\n' +
    '	<login-form></login-form>\n' +
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
  $templateCache.put('./views/app/protected/protected.html',
    '<md-content class="Page-Container" ng-controller="ProtectedController as vm">\n' +
    '	<div layout="column" class="Landing-cover" layout-align="center center">\n' +
    '		<div layout="column" layout-gt-sm="row">\n' +
    '			<h2>This is a protected page.</h2>\n' +
    '		</div>\n' +
    '		<br>\n' +
    '		<p>{{ vm.loggedin || "Please log in to view it\'s contents" }}</p>\n' +
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
  $templateCache.put('./views/app/register/register.html',
    '<md-content class="Register" ng-controller="RegisterController as vm">\n' +
    '	<h2 class="text-center">Register</h2>\n' +
    '	<register-form></register-form>\n' +
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
  $templateCache.put('./views/directives/login-form/login-form.html',
    '<form class="ng-pristine ng-invalid ng-invalid-required" method="post" ng-submit="vm.login()" name="loginForm">\n' +
    '  <div class="form-group has-feedback">\n' +
    '    <input style="background-repeat: no-repeat; background-attachment: scroll; background-position: right center; cursor: auto;" class="form-control input-lg ng-pristine ng-untouched ng-invalid ng-invalid-required" name="email" ng-model="vm.email" placeholder="Email" required="" autofocus="" type="text">\n' +
    '    <span class="ion-at form-control-feedback"></span>\n' +
    '  </div>\n' +
    '  <div class="form-group has-feedback">\n' +
    '    <input style="background-repeat: no-repeat; background-attachment: scroll; background-position: right center; cursor: auto;" class="form-control input-lg ng-pristine ng-untouched ng-invalid ng-invalid-required" name="password" ng-model="vm.password" placeholder="Password" required="" type="password">\n' +
    '    <span class="ion-key form-control-feedback"></span>\n' +
    '  </div>\n' +
    '  <button disabled="disabled" type="submit" ng-disabled="loginForm.$invalid" class="btn btn-lg  btn-block btn-success">Log in</button>\n' +
    '  <br>\n' +
    '  <p class="text-center text-muted">\n' +
    '    <small>Don\'t have an account yet? <a ui-sref="app.register">Register</a></small>\n' +
    '  </p>\n' +
    '  <div class="signup-or-separator">\n' +
    '    <h6 class="text">or</h6>\n' +
    '    <hr>\n' +
    '  </div>\n' +
    '</form>\n' +
    '<button class="btn btn-block btn-facebook" ng-click="vm.authenticate(\'facebook\')">\n' +
    '  <i class="ion-social-facebook"></i> Sign in with Facebook\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-google-plus" ng-click="vm.authenticate(\'google\')">\n' +
    '  <span class="ion-social-googleplus"></span>Sign in with Google\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-linkedin" ng-click="vm.authenticate(\'linkedin\')">\n' +
    '  <i class="ion-social-linkedin"></i> Sign in with LinkedIn\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-instagram" ng-click="vm.authenticate(\'instagram\')">\n' +
    '  <i class="ion-social-instagram"></i> Sign in with Instagram\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-twitter" ng-click="vm.authenticate(\'twitter\')">\n' +
    '  <i class="ion-social-twitter"></i> Sign in with Twitter\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-foursquare" ng-click="vm.authenticate(\'foursquare\')">\n' +
    '  <i class="fa fa-foursquare"></i> Sign in with Foursquare\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-github" ng-click="vm.authenticate(\'github\')">\n' +
    '  <i class="ion-social-github"></i> Sign in with GitHub\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-bitbucket" ng-click="vm.authenticate(\'bitbucket\')">\n' +
    '  <i class="fa fa-bitbucket"></i> Sign in with Bitbucket\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-yahoo" ng-click="vm.authenticate(\'yahoo\')">\n' +
    '  <i class="ion-social-yahoo"></i> Sign in with Yahoo\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-live" ng-click="vm.authenticate(\'live\')">\n' +
    '  <i class="ion-social-windows"></i> Sign in with Windows Live\n' +
    '</button>\n' +
    '<button class="btn btn-block btn-twitch" ng-click="vm.authenticate(\'twitch\')">\n' +
    '  <i class="ion-social-twitch"></i> Sign in with Twitch\n' +
    '</button>\n' +
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
  $templateCache.put('./views/directives/register-form/register-form.html',
    '<form class="ng-pristine ng-invalid ng-invalid-required ng-valid-email ng-valid-compare-to" method="post" ng-submit="vm.signup()" name="signupForm">\n' +
    '  <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.displayName.$invalid &amp;&amp; signupForm.displayName.$dirty }">\n' +
    '    <input style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-position: right center; cursor: auto;" class="form-control input-lg ng-pristine ng-untouched ng-invalid ng-invalid-required" name="displayName" ng-model="user.displayName" placeholder="Name" required="" autofocus="" type="text">\n' +
    '    <span class="ion-person form-control-feedback"></span>\n' +
    '    <!-- ngIf: signupForm.displayName.$dirty -->\n' +
    '  </div>\n' +
    '  <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.email.$invalid &amp;&amp; signupForm.email.$dirty }">\n' +
    '    <input style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDhss3LcOZQAAAU5JREFUOMvdkzFLA0EQhd/bO7iIYmklaCUopLAQA6KNaawt9BeIgnUwLHPJRchfEBR7CyGWgiDY2SlIQBT/gDaCoGDudiy8SLwkBiwz1c7y+GZ25i0wnFEqlSZFZKGdi8iiiOR7aU32QkR2c7ncPcljAARAkgckb8IwrGf1fg/oJ8lRAHkR2VDVmOQ8AKjqY1bMHgCGYXhFchnAg6omJGcBXEZRtNoXYK2dMsaMt1qtD9/3p40x5yS9tHICYF1Vn0mOxXH8Uq/Xb389wff9PQDbQRB0t/QNOiPZ1h4B2MoO0fxnYz8dOOcOVbWhqq8kJzzPa3RAXZIkawCenHMjJN/+GiIqlcoFgKKq3pEMAMwAuCa5VK1W3SAfbAIopum+cy5KzwXn3M5AI6XVYlVt1mq1U8/zTlS1CeC9j2+6o1wuz1lrVzpWXLDWTg3pz/0CQnd2Jos49xUAAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-position: right center;" class="form-control input-lg ng-pristine ng-untouched ng-valid-email ng-invalid ng-invalid-required" id="email" name="email" ng-model="user.email" placeholder="Email" required="" type="email">\n' +
    '    <span class="ion-at form-control-feedback"></span>\n' +
    '    <!-- ngIf: signupForm.email.$dirty -->\n' +
    '  </div>\n' +
    '  <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.password.$invalid &amp;&amp; signupForm.password.$dirty }">\n' +
    '    <input style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDhss3LcOZQAAAU5JREFUOMvdkzFLA0EQhd/bO7iIYmklaCUopLAQA6KNaawt9BeIgnUwLHPJRchfEBR7CyGWgiDY2SlIQBT/gDaCoGDudiy8SLwkBiwz1c7y+GZ25i0wnFEqlSZFZKGdi8iiiOR7aU32QkR2c7ncPcljAARAkgckb8IwrGf1fg/oJ8lRAHkR2VDVmOQ8AKjqY1bMHgCGYXhFchnAg6omJGcBXEZRtNoXYK2dMsaMt1qtD9/3p40x5yS9tHICYF1Vn0mOxXH8Uq/Xb389wff9PQDbQRB0t/QNOiPZ1h4B2MoO0fxnYz8dOOcOVbWhqq8kJzzPa3RAXZIkawCenHMjJN/+GiIqlcoFgKKq3pEMAMwAuCa5VK1W3SAfbAIopum+cy5KzwXn3M5AI6XVYlVt1mq1U8/zTlS1CeC9j2+6o1wuz1lrVzpWXLDWTg3pz/0CQnd2Jos49xUAAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-position: right center;" password-strength="" class="form-control input-lg ng-pristine ng-untouched ng-invalid ng-invalid-required" name="password" ng-model="user.password" placeholder="Password" required="" type="password"><span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>\n' +
    '    <span class="ion-key form-control-feedback"></span>\n' +
    '    <!-- ngIf: signupForm.password.$dirty -->\n' +
    '  </div>\n' +
    '  <div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.confirmPassword.$invalid &amp;&amp; signupForm.confirmPassword.$dirty }">\n' +
    '    <input style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIUlEQVQ4EX2TOYhTURSG87IMihDsjGghBhFBmHFDHLWwSqcikk4RRKJgk0KL7C8bMpWpZtIqNkEUl1ZCgs0wOo0SxiLMDApWlgOPrH7/5b2QkYwX7jvn/uc//zl3edZ4PPbNGvF4fC4ajR5VrNvt/mo0Gr1ZPOtfgWw2e9Lv9+chX7cs64CS4Oxg3o9GI7tUKv0Q5o1dAiTfCgQCLwnOkfQOu+oSLyJ2A783HA7vIPLGxX0TgVwud4HKn0nc7Pf7N6vV6oZHkkX8FPG3uMfgXC0Wi2vCg/poUKGGcagQI3k7k8mcp5slcGswGDwpl8tfwGJg3xB6Dvey8vz6oH4C3iXcFYjbwiDeo1KafafkC3NjK7iL5ESFGQEUF7Sg+ifZdDp9GnMF/KGmfBdT2HCwZ7TwtrBPC7rQaav6Iv48rqZwg+F+p8hOMBj0IbxfMdMBrW5pAVGV/ztINByENkU0t5BIJEKRSOQ3Aj+Z57iFs1R5NK3EQS6HQqF1zmQdzpFWq3W42WwOTAf1er1PF2USFlC+qxMvFAr3HcexWX+QX6lUvsKpkTyPSEXJkw6MQ4S38Ljdbi8rmM/nY+CvgNcQqdH6U/xrYK9t244jZv6ByUOSiDdIfgBZ12U6dHEHu9TpdIr8F0OP692CtzaW/a6y3y0Wx5kbFHvGuXzkgf0xhKnPzA4UTyaTB8Ph8AvcHi3fnsrZ7Wore02YViqVOrRXXPhfqP8j6MYlawoAAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-position: right center; cursor: auto;" password-match="user.password" class="form-control input-lg ng-pristine ng-untouched ng-valid ng-isolate-scope ng-valid-compare-to" name="confirmPassword" ng-model="confirmPassword" placeholder="Confirm Password" type="password">\n' +
    '    <span class="ion-key form-control-feedback"></span>\n' +
    '    <!-- ngIf: signupForm.confirmPassword.$dirty -->\n' +
    '  </div>\n' +
    '  <p class="text-center text-muted"><small>By clicking on Sign up, you agree to <a href="#">terms &amp; conditions</a> and <a href="#">privacy policy</a></small></p>\n' +
    '  <button disabled="disabled" type="submit" ng-disabled="signupForm.$invalid" class="btn btn-lg btn-block btn-primary">Sign up</button>\n' +
    '  <br>\n' +
    '  <p class="text-center text-muted">Already have an account? <a ui-sref="app.login">Log in now</a></p>\n' +
    '</form>\n' +
    '');
}]);
})();
