## Laravel 5.1 Angular Material Starter
> Version 2.6

<a href="https://infinite-dusk-3948.herokuapp.com/" target="_blank">View DEMO</a>

![Laravel & Angular](http://i.imgur.com/ZbLzOPP.jpg)


##### Table of Contents
[Overview](#overview)  
[Installation](#installation)  
[Issues, Questions and Feature Requests](#issues)  
[Planned features](#planned_features)  

<a name="overview"></a>
## OVERVIEW
This is a starter project that gives you an out of the box configuration Laravel 5.1 and AngularJS (folder by feature architecture).
Here are the goodies that you'll get:

* Laravel 5.1
* Angular
* Angular Material
* Elixir 3.0
* artisan generatores for angular (artisan ng:feature name, artisan ng:dialog name, etc..)
* [JWT auth](https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps)
* Laravel [DebugBar](https://github.com/barryvdh/laravel-debugbar)
* Angular [UI router](https://github.com/angular-ui/ui-router)
* [Optimized deployment script](https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/deploy.sh)
* [EditorConfig](http://editorconfig.org/) & [jscs](http://jscs.info/) sample config
* Jshint (rename _jshintrc to .jshintrc if you want to use it. Check [#11](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/11))
* Less
* Unsupported browser page for IE <= 10


<a name="installation"></a>
## Installation

    composer create-project jadjoubran/laravel5-angular-material-starter --prefer-dist
    cd laravel5-angular-material-starter
    #fix database credentials in .env
    npm install -g gulp bower
    npm install
    bower install
    gulp && gulp watch
    php artisan serve
* You're ready to go! <a href="http://localhost:8000" target="_blank">http://localhost:8000</a>
* Star the repo and submit your feedback as a new issue or to <a href="https://twitter.com/joubranjad" target="_blank">@JoubranJad</a>

<a name="issues"></a>
## Issues, Questions and Feature Requests
Open a new issue, I'd love to help.


<a name="planned_features"></a>
## Planned features


- simplify gulpfile using elixir.json
- custom elixir task: make jshint optional
- Migrate to open source hosting
- New demo pages: Toasts, Dialogs, Unsupported Browser, artisan angular generators, Elixir, Rest API, loading bar, debugbar, filters, JWT
- make gulp --production part of the automated release
- make readme more appealing
- jwt auth example (with seed) + route authentication
- composer.lock committed again (issue)
- choose between JWT (disable CSRF) or not (enable CSRF)
- even better support for 5.1 (fork?)
- optional phpcs support
