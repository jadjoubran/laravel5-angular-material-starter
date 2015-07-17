## Laravel 5.1 Angular Material Starter
> Version 2.0

<a href="https://jadjoubran.github.io/laravel5-angular-material-starter" target="_blank">View Frontend DEMO</a>

![Laravel & Angular](http://i.imgur.com/uUMaSyP.jpg)


## OVERVIEW
This is a starter project that gives you an out of the box configuration Laravel 5.1 and AngularJS (folder by feature architecture).
Here are the goodies that you'll get:

* Laravel 5.1
* Angular
* Angular Material
* [JSON Web Token authentication](https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps)
* [Laravel5 Debug Bar](https://github.com/barryvdh/laravel-debugbar)
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

Step by Step:
* `git clone git@github.com:jadjoubran/laravel5-angular-material-starter.git`
* php artisan jwt:generate (refresh jwt token | This is very important if you intend to use Json Web Tokens for authentication)
* create `.env` file (clone it from `.env.example` and adjust your DB connection string & generate a random APP_KEY)
* `npm install -g gulp bower`
* `composer install`
* `npm install`
* `bower install`
* `gulp`
* `gulp watch`
* `php -S localhost:8081 -t public`
* You're ready to go! <a href="http://localhost:8081" target="_blank">http://localhost:8081</a>
* Star the repo and submit your feedback as a new issue or on <a href="https://twitter.com/joubranjad" target="_blank">@JoubranJad</a>

Automated (assuming you have php, composer, npm, bower installed globally)
`git clone git@github.com:jadjoubran/laravel5-angular-material-starter.git && cd laravel5-angular-material-starter && bash setup.sh`

If you don't have composer (`composer --version` to make sure that you have it), you can install it using this command
`npm install -g getcomposer` thanks to [getcomposer](https://github.com/jadjoubran/getcomposer)

## Issues, Questions and Feature Requests
Open a new issue.

## What's next?

Here's what I'm planning for the next releases

- fix EditorConfig for PSR-2 in app/
- even better support for 5.1 (start from 5.1)
- jwt auth example (with seed)
- Add tooltips sample
- Speedup gulp watch
- Sample route authentication (via $localStorage)
- Gulp watch should not exit when it catches an error
- Host repository on Heroku and remove gh pages example


## Changelog

### v2.0.0
+ Json Web Token authentication based on https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps

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