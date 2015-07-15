## Laravel 5.1 Angular Material Starter
> Version 1.6

## Frontend Demo

[View Frontend DEMO](https://jadjoubran.github.io/laravel5-angular-material-starter)

![Laravel & Angular](http://i.imgur.com/XiMykki.png)


## OVERVIEW
This is a starter project that gives you an out of the box configuration Laravel 5.1 and AngularJS (folder by feature architecture).
Here are the goodies that you'll get:

* Laravel 5.1
* [Laravel5 Debug Bar](https://github.com/barryvdh/laravel-debugbar)
* Angular
* Angular Material
* [Angular UI router](https://github.com/angular-ui/ui-router) configuration with multiple views
* Optimized deployment script: [deploy.sh](https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/deploy.sh)
* EditorConfig
* JavaScript Code Style (jscs)
* Jshint (rename _jshintrc to .jshintrc if you want to use it. Your code needs to pass for [https://github.com/jadjoubran/laravel5-angular-material-starter/issues/11](gulp to recompile))
* Less
* Elixir (for all the above)
* Angular Material sample code
* Angular Material custom theming
* Sample integration between Restangular & Laravel API endpoint


## Installation

Follow these simple steps:

If you don't have composer (`composer --version` to make sure that you have it), you can install it using this command
`npm install -g getcomposer` thanks to [getcomposer](https://github.com/jadjoubran/getcomposer)

* `git clone git@github.com:jadjoubran/laravel5-angular-material-starter.git`
* create `.env` file (clone it from `.env.example` and adjust your DB connection string)
* `npm install -g gulp bower`
* `composer install`
* `npm install`
* `bower install`
* `gulp`
* `gulp watch`
* `php -S localhost:8081 -t public`


## Issues and Feature Requests

Open a new issue.

## What's next?

Here's what I'm planning for the next releases

- UI-router HTML5 mode urls
- https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps (write post installation steps or bash to run jwt)
- fix EditorConfig for PSR-2 in app/
- even better support for 5.1 (start from 5.1)
- Add tooltips sample
- Speedup gulp watch 
- Sample route authentication (via $localStorage)
- Gulp watch should not exit when it catches an error
- Installer script that does everything
- Host repository on AWS or DO and remove gh pages example


## Changelog

###v1.6.0
+ added optimized deployment script: [deploy.sh](https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/deploy.sh)


### v1.5.1
+ jshint is now optional. Rename _jshintrc to .jshintrc. Check [https://github.com/jadjoubran/laravel5-angular-material-starter/issues/11](issue #11)


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