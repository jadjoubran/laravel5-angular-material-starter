## Laravel 5 Angular Material Starter
> Version 1.2

![Laravel & Angular](http://i.imgur.com/XiMykki.png)

This is a starter project that gives you an out of the box configuration Laravel 5 and AngularJS (folder by feature architecture).
Here are the goodies that you'll get:

* Laravel5
* [Laravel5 Debug Bar](https://github.com/barryvdh/laravel-debugbar)
* Angular
* Angular Material
* Angular UI Router
* EditorConfig
* JavaScript Code Style (jscs)
* Jshint
* Less
* Elixir (for all the above)
* Angular Material sample code
* [ui-router](https://github.com/angular-ui/ui-router) configuration with multiple views


## Installation

Follow these simple steps:

If you don't have composer (`composer --version` to make sure that you have it), you can install it using this command
`npm install -g getcomposer` thanks to [getcomposer](https://github.com/jadjoubran/getcomposer)

* `git clone git@github.com:jadjoubran/laravel5-angular-material-starter.git`
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

Here's what I'm planning for the next versions:

+ Add sample Laravel APIs and call them using Restangular
+ Laravel login API fixes
+ Sample route authentication (via $localStorage)
+ Gulp watch should not exit when it catches an error
+ Host demo on github pages
+ Installer script that does everything

## Changelog

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