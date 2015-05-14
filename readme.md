## Laravel 5 Angular Material Starter

This is a starter project that gives you an out of the box configuration for the following:

* Laravel5
* [Laravel5 Debug Bar](https://github.com/barryvdh/laravel-debugbar)
* [Laravel5 Repositories](https://github.com/Bosnadev/Repositories)
* [Laravel5 Entrust](https://github.com/Zizaco/entrust)
* Angular
* Angular Material
* Angular UI Router
* EditorConfig
* JavaScript Code Style (jscs)
* Jshint
* Less
* Elixir (for all the above)


## Installation

Follow these simple steps:

If you don't have composer (composer --version to make sure that you have it), you can install it using this command
`npm install -g getcomposer` thanks to [getcomposer](https://github.com/jadjoubran/getcomposer)

* Clone the repository
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

+ Remove Entrust & Repositories since they depend on each user's preference and can be easily installed
+ Add Angular boilerplate for Landing and Login
+ Add sample Material Design pages
+ Add sample UI Router conf that contains header and footer


## Changelog

### v1.0.3

+ Fixed Installation steps
+ Added Changelog
+ Planning future releases


### v1.0.2

+ renamed resources/views/index.php to resources/views/index.blade.php for the blade syntax to work (CSRF token) [PR 3](https://github.com/jadjoubran/laravel5-angular-material-starter/pull/3)


### v1.0.1

+ Removed `composer.lock` in order to pull the latest version of vendor dependencies [issue #1](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/1)


### v1.0.0

+ Laravel5 installation
+ Basic Angular Support with Angular Material and UI Router
+ Laravel 5 debugbar, Entrust and Repositories
+ EditorConfig, jscs, jshint setup
+ Elixir setup



## Contributing

You need to have this `pre-commit` hook:
https://gist.github.com/jadjoubran/ccf963d68f6d80766298
in order to prevent regression of [issue #1](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/1)