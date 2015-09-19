## Changelog

### 2.10.0
+ dingo/api integration with jwt auth [#43](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/43)
+ fixed deploy.sh script to migrate in production [#56](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/56)
+ fixed links in generators documentation [#55](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/55)
+ updated generators to match Demo layout [#54](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/54)

### 2.9.1
+ responsive layout on mobile by [@Bodom78](https://github.com/Bodom78) - [#34](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/34#issuecomment-140406965)
+ unit test coverage for artisan ng:* generators [#42](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/42)
+ unit test coverage to safely deploy using deploy.sh [#42](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/42)
+ remove route:clear and config:clear from deploy.sh [#47](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/47)

### v2.9.0
+ improved description of ng:* generators
+ moved planned features to github issues
+ Applied Laravel 5.1.11 migration (Introduces Authorization support) [#39](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/39)
+ Updated composer depencencies to be aligned with the current version of Laravel [#40](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/40)
+ fixed JWT authentication bug when using Apache [#38](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/38)
+ added unit tests for Laravel Routes. More tests are coming [#42](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/42)

### v2.8.2
+ fixed location for main.js and routes.js

### v2.8.1
+ setup code coverage (code climate)
+ travis setup
+ fixed deploy.sh and optimized composer install
+ new demo on elasticbeanstalk (because heroku are messing up with the availability)

### v2.8.0
+ JWT Authentication fixes
+ JWT Auth demo page
+ API versionning in documentation

### v2.7.5
+ fixed issues with ng:directive generator

### v2.7.4
+ New angular/directives folder
+ **artisan ng:directive name** generator

### v2.7.3
+ New demo page for Elixir
+ New demo page: Rest API
+ Misc demo page: angular-loading-bar, debugbar & filters
+ Demo Landing page Call to Action

### v2.7.2
+ New demo page for Toasts
+ New demo page for Dialogs
+ New demo page for Unsupported Browser
+ New demo apge for Artisan Angular Generators

### v2.7.1
+ implement livereload
+ livereload: doing soft reload on CSS instead of a full page reload

### v2.7.0
+ custom elixir ingredients setup & sample
+ custom elixir task: make jshint optional
+ custom elixir task: bower - much faster than the one previously used
+ bower task now automatically uses mainFile from bower.json
+ gulp & gulp watch are now much much faster than before

### v2.6.2
+ fixed elixir watcher for less
+ artisan generator for creating a new angular service **artisan ng:service name**
+ artisan generator for creating a new angular filter **artisan ng:filter name**
+ artisan generator for creating a new angular config **artisan ng:config name**

### v2.6.1
+ updated bower dependencies (angular material released 0.10.1)
+ added artisan generator for creating a new angular feature: **artisan ng:feature name**
+ improve generator to call controller with StudlyCase (StudlyCaseCtrl)
+ artisan generator for creating a angular material custom dialogs: **artisan ng:dialog name**

### v2.6.0
+ Update to [elixir 3.0](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/20)
+ fixed gulp bower task
+ gulp tasks are now much faster (gulp watch is much faster)

### v2.5.0
+ Setup styleci.io - fixed php code style to be inline with Laravel (Laravel is using Style CI)

### v2.4.3
+ IE sidebar fix

### v2.4.2
+ Unsupported browser page + IE10 conditional comment
+ Added meta viewport for mobile

### v2.4.0
+ updated .editorConfig to work with Laravel ([*] taken from Laravel's .gitignore)

### v2.3.3
+ dialog service + update documentation


### v2.3.2
+ remove changelog on composer create-project
+ toast service + update documentation
+ sidebar markup fixes

### v2.3.1
+ removing development files using post-create-project-cmd
+ added `human_readable` angular filter

### v2.3.0
+ Simplified installation, now using `composer create-project`
+ fix issue with http over https


### v2.2.3
+ now using `artisan serve`
+ now using `artisan key:generate` instead of instructing the user to manually update it

### v2.2.2
+ new documentation page: Theme
+ new documentation page: Deploy
+ update documentation & readme cover

### v2.2.1
+ removed imagemin for now since it's not being used in elixir

### v2.2.0
+ New demo & documentation

### v2.1.2
+ Added [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar/) which works automatically

### v2.1.1
+ Added angularController to serve app (will be used later on for unsupported browser)

### v2.1.0
+ fixed documentation
+ fixed restangular config
+ added sample restangular API call
+ removed csrf token fix since we disabled CSRF when setting up JWT auth

### v2.0.1
+ fix mdtabs

### v2.0.0
+ Json Web Token authentication based on https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps
+ New improved demo! Using heroku instead of github pages.

### v1.7.1
+ Installer script that installs all the required packages

### v1.7.0
+ removed UI router HTML5 mode because it breaks when refreshing and I don't want to mess up with the routes

### v1.6.1
+ UI-router HTML5 mode urls
+ updated documentation


### v1.6.0
+ added optimized deployment script: [deploy.sh](https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/deploy.sh)


### v1.5.1
+ invalid now - jshint is now optional. Rename _jshintrc to .jshintrc. Check [issue #11](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/11)


### v1.5.0
+ Add angular material icons
+ Add SVG-Morpheus for Angular Material Icons
+ Updated demo & gh-pages
+ Updated angular material
+ Add contributor covenant (code of conduct)


### v1.4.2
+ Elixir improvements for Laravel 5.1
+ Removed /resources/.tmp (not used anymore because of Elixir improvements)

### v1.4.1
+ Fixed laravel 5.1 migration issue

### v1.4.0
+ Laravel 5.1 Support
+ Remove CSRF token fix (angular automatically takes care of it http://laravel.com/docs/5.1/routing#csrf-x-xsrf-token)


### v1.3.1

+ Add sample Layout which relies on flexbox
+ Update Angular, Angular ui-router and Angular Material


### v1.3.0

+ Host demo on github pages
+ Add sample Laravel APIs and call them using Restangular


### v1.2.2

+ API response macro (to make API calls more compatible with Restangular)


### v1.2.1

+ Remove unused dependency in package.json
+ Material design custom theming


### v1.2.0

+ Add Angular Material boilerplate for Dashboard
+ Add sample UI Router conf that contains header and footer
+ Sample code for Tabs
+ Add Restangular
+ CSRF integration with Restangular
+ Add Laravel & Angular promo image (from [Laravel News](https://laravel-news.com))


### v1.1.1

+ Add Angular Material boilerplate for Landing
+ Sample code for Toast and Dialog
+ Disable Elixir success notifications
+ Add $localStorage (ngstorage) - will be used later on for sample authentication driver
+ Added basic ui-router for Landing


### v1.1.0

+ Remove Entrust & Repositories since they depend on each user's preference and can be easily installed


### v1.0.3

+ Fix Installation steps
+ Add Changelog
+ Plan future releases


### v1.0.2

+ Rename resources/views/index.php to resources/views/index.blade.php for the blade syntax to work (CSRF token) [PR 3](https://github.com/jadjoubran/laravel5-angular-material-starter/pull/3)


### v1.0.1

+ Remove `composer.lock` in order to pull the latest version of vendor dependencies [issue #1](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/1)


### v1.0.0

+ Laravel5 installation
+ Basic Angular Support with Angular Material and UI Router
+ Laravel 5 debugbar, Entrust and Repositories
+ EditorConfig, jscs, jshint setup
+ Elixir setup
