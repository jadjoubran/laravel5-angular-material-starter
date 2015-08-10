## Laravel 5.1 Angular Material Starter
> Version 2.3

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
* [JSON Web Token authentication](https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps)
* [Laravel5 Debug Bar](https://github.com/barryvdh/laravel-debugbar)
* [Angular UI router](https://github.com/angular-ui/ui-router) configuration with multiple views
* [Optimized deployment script](https://github.com/jadjoubran/laravel5-angular-material-starter/blob/master/deploy.sh)
* EditorConfig
* JavaScript Code Style (jscs)
* Jshint (rename _jshintrc to .jshintrc if you want to use it. Check [#11](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/11))
* Less
* Elixir
* Angular Material sample code
* Angular Material custom theming
* Sample integration between Restangular & Laravel API endpoint


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

- dialog service + update documentation
- redirect to unsupported browser page
- New demo pages: Toasts, Dialogs, Rest API, loading bar, debugbar, filters
- Update to elixir 3.0 + use elixir.json
- fix gulp bower task
- continue heroku setup (database, migrations, seeding)
- make readme more appealing
- even better support for 5.1 (fork?)
- jwt auth example (with seed)
- artisan generators
- Add tooltips sample
- Speedup gulp watch
- Sample route authentication (via $localStorage)
