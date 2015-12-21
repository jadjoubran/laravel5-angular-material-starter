(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/deploy/deploy.html',
    '<md-content class="Page-Container" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar class="PageToolbar">\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>deploy.sh</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content class="language-markup"><pre><code class="line-numbers language-* language-bash">\n' +
    '#ssh to your server here\n' +
    'php artisan route:clear\n' +
    'php artisan config:clear\n' +
    'git pull\n' +
    'php artisan migrate\n' +
    'composer install\n' +
    'php artisan route:cache\n' +
    'php artisan config:cache\n' +
    'php artisan optimize</code></pre>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/deploy.sh" target="_blank">Deploy.sh</a>\n' +
    '                is available at the root level of your app.\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                Keep in mind that any configuration/routing change that you make, will not take effect until you clear the cache again.\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '</md-content>');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/generators/generators.html',
    '<md-content class="Page-Container" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>artisan ng:* generators</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content class="language-markup"><pre><code class="line-numbers language-* language-bash">\n' +
    'artisan ng:feature name    #New feature inside angular/app/\n' +
    'artisan ng:dialog name     #New custom dialog inside angular/dialogs/\n' +
    'artisan ng:directive name  #New directive inside angular/directives/\n' +
    'artisan ng:service name    #New service inside angular/services/\n' +
    'artisan ng:filter name     #New filter inside angular/filters/\n' +
    'artisan ng:config name     #New config inside angular/config/</code></pre>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                Do <strong>not</strong> append the words Service, Controller or Ctrl.\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                They will be automatically created according to the <a href="laravel.com/docs/5.1/helpers#method-studly-case" target="_blank">StudlyCase</a> of the name you entered.\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                Use the <a href="laravel.com/docs/5.1/helpers#method-snake-case" target="_blank">snake_case</a> for more than 1 word: add_users, add_items, edit_data\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '</md-content>');
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
    '<div class="md-toolbar-tools">\n' +
    '	<md-button\n' +
    '			ng-click="openSideNav()"\n' +
    '			hide-gt-md\n' +
    '			class="md-icon-button"\n' +
    '			aria-label="Show Menu">\n' +
    '		<ng-md-icon icon="menu"></ng-md-icon>\n' +
    '	</md-button>\n' +
    '	<h2>\n' +
    '		<span>{{current_page}}</span>\n' +
    '	</h2>\n' +
    '	<span flex></span>\n' +
    '	<iframe src="https://ghbtns.com/github-btn.html?user=jadjoubran&repo=laravel5-angular-material-starter&type=star&count=true&size=large"\n' +
    '			frameborder="0" scrolling="0" width="160px" height="30px"></iframe>\n' +
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
  $templateCache.put('./views/app/elixir/elixir.html',
    '<md-content class="Page-Container" ng-controller="ElixirCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Elixir 3.0 Configuration</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                Elixir 3.0 has been configured to generate the following:\n' +
    '            </p>\n' +
    '            <ul>\n' +
    '                <li><strong>public/js/vendor.js</strong> from your <strong>bower.json</strong>. Always append <strong>--save</strong> to your bower install commands.</li>\n' +
    '                <li><strong>public/js/app.js</strong> from your javascript files. They are automatically annotated using <a href="https://github.com/olov/ng-annotate" target="_blank">ng-annotate</a>.</li>\n' +
    '                <li><strong>public/css/vendor.css</strong> from your <strong>bower.json</strong>. Always append <strong>--save</strong> to your bower install commands.</li>\n' +
    '                <li><strong>public/css/app.css</strong> from your less files. You can easily switch to sass if you\'d like to.</li>\n' +
    '                <li>Views are automatically copied for you.</li>\n' +
    '                <li>Livereload is also automatically configured.\n' +
    '                    <ul>\n' +
    '                        <li>It re-injects the css files whenever they change</li>\n' +
    '                        <li>It reloads the page when your javascript or views change</li>\n' +
    '                    </ul>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <p>\n' +
    '                You can also create new elixir tasks inside the /tasks folder. Just like the <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/tasks/bower.task.js" target="_blank">bower</a> and <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/tasks/angular.task.js" target="_blank">angular</a> tasks.\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '</md-content>\n' +
    '\n' +
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
    '<md-content class="Page-Container" ng-controller="LandingCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '        <img ng-src="{{promoImage}}" class="md-card-image" alt="Laravel 5 Angular material starter">\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <h2 class="md-title">Landing page <ng-md-icon icon="{{icon}}" class="Landing-demoIcon"></ng-md-icon></h2>\n' +
    '            <p>\n' +
    '                <br>\n' +
    '                This is a starter project that gives you an out of the box configuration for Laravel5 and\n' +
    '                Angular.<br>\n' +
    '            </p>\n' +
    '            <md-button class="md-primary md-raised" ui-sref="app.install">Install</md-button>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '</md-content>\n' +
    '\n' +
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
  $templateCache.put('./views/app/jwt_auth/jwt_auth.html',
    '<md-content class="Page-Container" ng-controller="JwtAuthCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '	<md-card>\n' +
    '\n' +
    '		<md-toolbar>\n' +
    '			<div class="md-toolbar-tools">\n' +
    '				<h2>How it works</h2>\n' +
    '			</div>\n' +
    '		</md-toolbar>\n' +
    '\n' +
    '		<md-card-content ng-show="step === 1">\n' +
    '			In order to explain how Json Web Token authentication works, let\'s go through this interactive tutorial:<br/>\n' +
    '			<br/>\n' +
    '			Take a look at the existing routes.php file and then click on this button which calls the code below:<br/>\n' +
    '			<br/>\n' +
    '			<md-button class="md-primary md-raised" ng-click="requestToken()">Request protected route</md-button>\n' +
    '			<md-card-content class="language-angular"><pre><code class="line-numbers language-* language-javascript">API.all(\'sample\').get(\'protected\');</code></pre></md-card-content>\n' +
    '			<br/>\n' +
    '			<md-button class="md-accent md-raised" ng-click="nextStep()">Next</md-button>\n' +
    '		</md-card-content>\n' +
    '	</md-card-content>\n' +
    '	<md-card-content ng-show="step === 2">\n' +
    '		Since we can\'t access this route without being authenticated, we need to login:<br/>\n' +
    '		<br/>\n' +
    '		<md-card-content class="language-angular"><pre><code class="line-numbers language-* language-javascript">API.all(\'users/login\').post($scope.user);</code></pre>\n' +
    '		<br/>\n' +
    '		If you\'re running this locally, then you need to make sure that you have your database & database connection setup. Also make sure to run <em>php artisan db:seed</em><br/>\n' +
    '		<br/>\n' +
    '		<md-button class="md-primary md-raised" ng-click="login()">Login & Store Token</md-button>\n' +
    '	</md-card-content>\n' +
    '</md-card-content>\n' +
    '<md-card-content ng-show="step === 3">\n' +
    '	We\'re logged in! And the API replied with a Token. A JWT to be specific.<br/>\n' +
    '	We need to store it in localStorage so that we can use it later on.<br/>\n' +
    '	<br/>\n' +
    '	<md-card-content class="language-angular"><pre><code class="line-numbers language-* language-angular">$localStorage.jwt = response.data.token;</code></pre>\n' +
    '	<br/>\n' +
    '	We already stored it for you in the success callback of the Login method.<br/>\n' +
    '	Now we need to send the following header in all subsequent requests, so that we can tell the server that we\'re logged in:<br/>\n' +
    '	<br/>\n' +
    '	<md-card-content><pre><code class="line-numbers language-*">Authorization: Bearer {jwt}</code></pre></md-card-content>\n' +
    '	<br/>\n' +
    '	We\'re already doing this for you in angular/services/API.js: addFullRequestInterceptor.<br/>\n' +
    '	All you have to do now, is request the protected route:<br/>\n' +
    '	<md-card-content class="language-angular"><pre><code class="line-numbers language-* language-javascript">API.all(\'sample\').get(\'protected\');</code></pre></md-card-content>\n' +
    '    <md-button class="md-primary md-raised" ng-click="requestToken()">Request protected route</md-button>\n' +
    '</md-card-content>\n' +
    '</md-card-content>\n' +
    '<md-divider></md-divider>\n' +
    '<md-card-content>\n' +
    '	API Output: <span ng-style="outputStatus" style="word-wrap: break-word;">{{output}}</span>\n' +
    '</md-card-content>\n' +
    '<md-divider></md-divider>\n' +
    '<md-card-content>\n' +
    '	$localStorage.jwt: <span style="word-wrap: break-word;">{{$localStorage.jwt}}</span>\n' +
    '	<br/>\n' +
    '	<md-button ng-if="$localStorage.jwt && step === 1" ng-click="$localStorage.$reset()">Clear localstorage</md-button>\n' +
    '</md-card-content>\n' +
    '\n' +
    '</md-card>\n' +
    '\n' +
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
  $templateCache.put('./views/app/dialogs/dialogs.html',
    '<md-content class="Page-Container" ng-controller="DialogsCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>DialogService</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content class="language-markup"><pre><code class="line-numbers language-* language-javascript">\n' +
    'DialogService.alert(\'This is an alert title\', \'You can specify some description text in here.\');\n' +
    '\n' +
    'DialogService.confirm(\'This is a confirm title\', \'Are you sure you want to do this?\').then(\n' +
    '	function (){\n' +
    '		console.log (\'Success\');\n' +
    '	},\n' +
    '	function (){\n' +
    '		console.log(\'Cancel\');\n' +
    '	}\n' +
    ');\n' +
    '\n' +
    '//use artisan ng:dialog add_users\n' +
    '//$scope is optional. You\'ll be able to use $scope.$parent from within the dialog\'s controller\n' +
    'DialogService.fromTemplate(\'add_users\', $scope);</code></pre>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/services/dialog.js" target="_blank">DialogService</a>\n' +
    '                can be extended to suit your needs.\n' +
    '            </p>\n' +
    '            <span class="md-subhead">{{confirm_message}}</span>\n' +
    '            <br>\n' +
    '            <div layout="row" layout-align="start center">\n' +
    '                <md-button ng-click="alertDialog()">Alert Dialog</md-button>\n' +
    '                <md-button ng-click="confirmDialog()">Confirm Dialog</md-button>\n' +
    '                <md-button ng-click="customDialog()">Custom Dialog</md-button>\n' +
    '            </div>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
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
  $templateCache.put('./views/app/misc/misc.html',
    '<md-content class="Page-Container" ng-controller="MiscCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Debugbar</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <img src="https://cloud.githubusercontent.com/assets/973269/4270452/740c8c8c-3ccb-11e4-8d9a-5a9e64f19351.png" width="100%" alt="Debugbar screenshot">\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/barryvdh/laravel-debugbar" target="_blank">Debugbar</a> allows you to easily debug your app.\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                You can debug pretty much everything: queries, routes, messages, mails, views, etc..\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Cross Origin Resource Sharing (CORS)</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/barryvdh/laravel-cors" target="_blank">Laravel-cors</a> works out of the box. All API endpoints return the allow-access-origin header. The <strong>cors</strong> middleware is enabled in the global middlewares in app\\Http\\kernel.php.\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Angular Loading Bar</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="http://chieffancypants.github.io/angular-loading-bar/" target="_blank">Angular Loading Bar</a> is that loading bar that you see on top when you navigate between routes.\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Angular Filters</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                Laravel5-angular-material-starter comes with some useful angular filters:\n' +
    '            </p>\n' +
    '            <ul>\n' +
    '                <li><a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/filters/capitalize.js" target="_blank">Capitalize</a></li>\n' +
    '                <li><a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/filters/human_readable.js" target="_blank">humanReadable</a></li>\n' +
    '                <li><a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/filters/trust_html.js" target="_blank">trust_html</a></li>\n' +
    '                <li><a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/filters/ucfirst.js" target="_blank">ucfirst</a></li>\n' +
    '            </ul>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
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
  $templateCache.put('./views/app/rest_api/rest_api.html',
    '<md-content class="Page-Container" ng-controller="RestApiCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '	    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>dingo/API</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content class="language-markup"><pre><code class="line-numbers language-* language-php">\n' +
    '$api->version(\'v1\', function ($api) {\n' +
    '    $api->get(\'data\', \'App\\Http\\Controllers\\WelcomeController@getSample\');\n' +
    '});</code></pre>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/dingo/api" target="_blank">dingo/api</a> package is meant to provide you, with a set of tools to help you easily and quickly build your own API. dingo/api works out of the box in Laravel angular material starter.<br>\n' +
    '                Feel free to check their <a href="https://github.com/dingo/api/wiki" target="_blank">wiki</a> to customize it.\n' +
    '                dingo/api is configured to work harmoniously with <a ui-sref="app.jwt_auth">JWT-auth</a>.\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Restangular</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content class="language-markup"><pre><code class="line-numbers language-* language-javascript">\n' +
    'API.all(\'data\').doGET().then(function(response){\n' +
    '    console.log(response.data);\n' +
    '});</code></pre>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/mgonto/restangular" target="_blank">Restangular</a> is an AngularJS service to handle Rest API Restful Resources properly and easily.\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>API Response Macro</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content class="language-markup"><pre><code class="line-numbers language-* language-php">\n' +
    '//return your data using the api response macro\n' +
    'return response()->success($data);</code></pre>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/app/Providers/ResponseMacroServiceProvider.php" target="_blank">ResponseMacroServiceProvider</a> returns your data inside the <strong>data</strong> object.<br>\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                You can customize it to include other properties.\n' +
    '            </p>\n' +
    '            <p>\n' +
    '            <p>\n' +
    '                Also route versioning and Accept header are configured for you in <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/config/restangular.js" target="_blank">angular/config/restangular.js</a>, to match with Dingo/API.\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
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
  $templateCache.put('./views/app/sidebar/sidebar.html',
    '<md-list>\n' +
    '	<div ui-sref-active="active" ui-sref="app.landing" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Overview</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.install" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Install</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.tabs" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Features</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.deploy" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Deploy</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.theme" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Theme</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.generators" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Generators</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.jwt_auth" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>JWT Auth</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.toasts" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Toasts</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.dialogs" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Dialogs</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.elixir" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Elixir</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.rest_api" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>REST API</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.unsupported_browser" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Unsupported Browser</md-list-item>\n' +
    '	</div>\n' +
    '	<div ui-sref-active="active" ui-sref="app.misc" class="Sidebar-page">\n' +
    '		<md-list-item md-ink-ripple>Miscellaneous Features</md-list-item>\n' +
    '	</div>\n' +
    '</md-list>');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/tabs/tabs.html',
    '<md-content class="Page-Container" ng-controller="DashboardCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <md-tabs md-dynamic-height md-border-bottom>\n' +
    '                <md-tab label="Laravel 5">\n' +
    '                    <md-content class="md-padding">\n' +
    '                        <h1 class="md-display-1">Laravel 5</h1>\n' +
    '\n' +
    '                        <p>\n' +
    '                            The Laravel 5.1 that you loved, comes pre-configured to run with AngularJS:\n' +
    '                        </p>\n' +
    '                        <ul>\n' +
    '                            <li>JWT Authentication</li>\n' +
    '                            <li>A view (resources/index.blade.php) that loads all the assets you need (CSS and JS) &amp;\n' +
    '                                sets up angular ui-router\n' +
    '                            </li>\n' +
    '                            <li><a href="https://github.com/barryvdh/laravel-debugbar" target="_blank">Debugbar</a> for\n' +
    '                                Laravel 5: It\'s that bar you see at the bottom. Very useful for debugging the API\n' +
    '                            </li>\n' +
    '                            <li>Sample API endpoints</li>\n' +
    '                            <li>Elixir configuration for Angular, jshint, bower and views.</li>\n' +
    '                            <li>Optimized deployment script.</li>\n' +
    '                            <li>API response macro</li>\n' +
    '                        </ul>\n' +
    '\n' +
    '                    </md-content>\n' +
    '                </md-tab>\n' +
    '                <md-tab label="AngularJS">\n' +
    '                    <md-content class="md-padding">\n' +
    '                        <h1 class="md-display-1">AngularJS</h1>\n' +
    '\n' +
    '                        <p>\n' +
    '                            AngularJS comes ready to communicate with the Laravel 5 API that you\'re building. It\n' +
    '                            actually\n' +
    '                            comes with a few sample API endpoints!\n' +
    '                        </p>\n' +
    '                        <p>\n' +
    '                            This is what you have out of the box:\n' +
    '                        </p>\n' +
    '                        <ul>\n' +
    '                            <li>A flexible and powerful router for Angular: <a\n' +
    '                                    href="https://github.com/angular-ui/ui-router" target="_blank">ui-router</a></li>\n' +
    '                            <li><a href="https://github.com/mgonto/restangular" target="_blank">Restangular</a> makes\n' +
    '                                communicating with the API a breeze!\n' +
    '                            </li>\n' +
    '                            <li>Support for CSRF token via Restangular</li>\n' +
    '                            <!-- <li>Sample API calls</li> -->\n' +
    '                            <li>Sample UI router with multiple views (main &amp; footer)</li>\n' +
    '                            <li>UI Router sample authentication</li>\n' +
    '                            <li><a href="https://github.com/gsklee/ngStorage">ngStorage</a> module which simplifies access to localStorage.. The Angular way!</li>\n' +
    '                        </ul>\n' +
    '\n' +
    '                    </md-content>\n' +
    '                </md-tab>\n' +
    '                <md-tab label="Angular Material">\n' +
    '                    <md-content class="md-padding">\n' +
    '                        <h1 class="md-display-1">Angular Material</h1>\n' +
    '\n' +
    '                        <p>\n' +
    '                            Material Design as a UI library!\n' +
    '                        </p>\n' +
    '                        <p>\n' +
    '                            Here\'s what you\'ll get:\n' +
    '                        </p>\n' +
    '                        <ul>\n' +
    '                            <li>Sample Landing and Dashboard pages design with Material Design</li>\n' +
    '                            <li>Custom Material Design theme so that you can easily create your own theme</li>\n' +
    '                            <li>Sample Dialog, Toast notifications &amp; Tabs</li>\n' +
    '                            <li>More coming soon!</li>\n' +
    '                        </ul>\n' +
    '\n' +
    '                    </md-content>\n' +
    '                </md-tab>\n' +
    '            </md-tabs>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
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
  $templateCache.put('./views/app/theme/theme.html',
    '<md-content class="Page-Container" layout="column" layout-align="start center">\n' +
    '\n' +
    '	<md-card>\n' +
    '\n' +
    '		<md-toolbar>\n' +
    '			<div class="md-toolbar-tools">\n' +
    '				<h2>theme.js</h2>\n' +
    '			</div>\n' +
    '		</md-toolbar>\n' +
    '\n' +
    '		<md-card-content class="language-markup"><pre><code class="line-numbers language-* language-javascript">\n' +
    '(function(){\n' +
    '"use strict";\n' +
    '\n' +
    'angular.module(\'app.config\').config( function($mdThemingProvider) {\n' +
    '	/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */\n' +
    '	$mdThemingProvider.theme(\'default\')\n' +
    '	.primaryPalette(\'indigo\')\n' +
    '	.accentPalette(\'grey\')\n' +
    '	.warnPalette(\'red\');\n' +
    '});\n' +
    '\n' +
    '})();</code></pre>\n' +
    '		</md-card-content>\n' +
    '\n' +
    '		<md-card-content>\n' +
    '			<p>\n' +
    '				<a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/config/theme.js" target="_blank">angular/config/theme.js</a>\n' +
    '				is where you can change your theme.\n' +
    '			</p>\n' +
    '			<p>\n' +
    '				Visit <a href="https://material.angularjs.org/#/Theming/01_introduction" target="_blank">https://material.angularjs.org/#/Theming/01_introduction</a> for more information.\n' +
    '			</p>\n' +
    '		</md-card-content>\n' +
    '\n' +
    '	</md-card>\n' +
    '\n' +
    '</md-content>');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/toasts/toasts.html',
    '<md-content class="Page-Container" ng-controller="ToastsCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>ToastService</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <md-card-content class="language-markup"><pre><code class="line-numbers language-* language-javascript">\n' +
    '//info\n' +
    'ToastService.show(\'This is a toast notification!\');\n' +
    '\n' +
    '//error\n' +
    'ToastService.error(\'Connection interrupted!\');</code></pre>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/angular/services/toast.js" target="_blank">ToastService</a>\n' +
    '                can be extended to suit your needs.\n' +
    '            </p>\n' +
    '            <div layout="row" layout-align="start center">\n' +
    '                <md-button ng-click="toastSuccess()">Add User (success)</md-button>\n' +
    '                <md-button ng-click="toastError()">Load Data (error)</md-button>\n' +
    '            </div>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
    '</md-content>');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/unsupported_browser/unsupported_browser.html',
    '<md-content class="Page-Container" ng-controller="UnsupportedBrowserCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '    <md-card>\n' +
    '\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Unsupported Browser Page</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '\n' +
    '        <img src="https://i.imgur.com/5sRuLSo.png" alt="Unsupported Browser Page for IE <= 10">\n' +
    '        <md-card-content>\n' +
    '            <p>\n' +
    '                Open <a href="/unsupported-browser" target="_blank">/unsupported-browser</a> to see the unsupported browser page that shows for Internet Explorer 10 or below.\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                This is necessary because Angular Material uses the newest features in CSS (such as flexbox or its layout).\n' +
    '            </p>\n' +
    '        </md-card-content>\n' +
    '\n' +
    '    </md-card>\n' +
    '\n' +
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
  $templateCache.put('./views/app/install/install.html',
    '<md-content class="Page-Container" ng-controller="LandingCtrl" layout="column" layout-align="start center">\n' +
    '\n' +
    '	<md-card>\n' +
    '\n' +
    '		<md-toolbar class="PageToolbar">\n' +
    '			<div class="md-toolbar-tools">\n' +
    '				<h2>composer create-project</h2>\n' +
    '			</div>\n' +
    '		</md-toolbar>\n' +
    '\n' +
    '		<md-card-content>\n' +
    '		<u>Heads up for Windows + Vagrant users:</u> Start by applying the fix in <a href="https://github.com/jadjoubran/laravel5-angular-material-starter/issues/61#issuecomment-145564131" target="_blank">issue #61</a>\n' +
    '		</md-card-content>\n' +
    '\n' +
    '		<md-card-content class="language-markup"><pre><code class="line-numbers language-* language-bash">\n' +
    'composer create-project jadjoubran/laravel5-angular-material-starter --prefer-dist\n' +
    'cd laravel5-angular-material-starter\n' +
    '#fix database credentials in .env\n' +
    'npm install -g gulp bower\n' +
    'npm install\n' +
    'bower install\n' +
    'gulp && gulp watch\n' +
    'php artisan serve</code></pre>\n' +
    '		</md-card-content>\n' +
    '\n' +
    '		<md-card-content>\n' +
    '			<p>\n' +
    '				You\'re ready to go! Open <a href="http://localhost:8000" target="_blank">http://localhost:8000</a> in your browser.\n' +
    '			</p>\n' +
    '		</md-card-content>\n' +
    '\n' +
    '	</md-card>\n' +
    '\n' +
    '</md-content>\n' +
    '');
}]);
})();
