## Laravel 5.1 Angular Material Starter
> Version 2.8

[![Latest Stable Version](https://poser.pugx.org/jadjoubran/laravel5-angular-material-starter/v/stable)](https://packagist.org/packages/jadjoubran/laravel5-angular-material-starter)
[![Latest Unstable Version](https://poser.pugx.org/jadjoubran/laravel5-angular-material-starter/v/unstable)](https://packagist.org/packages/jadjoubran/laravel5-angular-material-starter)
[![Code Climate](https://codeclimate.com/github/jadjoubran/laravel5-angular-material-starter/badges/gpa.svg)](https://codeclimate.com/github/jadjoubran/laravel5-angular-material-starter)
[![StyleCI](https://styleci.io/repos/34944760/shield)](https://styleci.io/repos/34944760)
[![License](https://poser.pugx.org/jadjoubran/laravel5-angular-material-starter/license)](https://packagist.org/packages/jadjoubran/laravel5-angular-material-starter)

<a href="https://infinite-dusk-3948.herokuapp.com/" target="_blank">View DEMO</a>

![Laravel & Angular](https://i.imgur.com/ZbLzOPP.jpg)


##### Table of Contents
[Overview](#overview)  
[Installation](#installation)  
[Issues, questions and feature requests](#issues)  
[Planned features](#planned_features)  

<a name="overview"></a>
## OVERVIEW
This is a starter project that gives you an out of the box configuration Laravel 5.1 and AngularJS (folder by feature architecture).
Here are the goodies that you'll get:

* Laravel 5.1
* Angular
* Angular Material
* Blazing fast Elixir 3.0 configuration with custom tasks
* artisan generators for angular (artisan ng:feature name, artisan ng:dialog name, etc..)
* check out the full <a href="https://infinite-dusk-3948.herokuapp.com/" target="_blank">list of features</a>


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
## Issues, questions and feature requests
Open a new issue, I'd love to help.


<a name="planned_features"></a>
## Planned features

- choose between JWT (disable CSRF) or not (enable CSRF) (or just add it to installation)
- automate tests
- Make sure that all features have been documented (jshint, jscs)
- Migrate to open source hosting + remove composer.lock properly from pre-commit
- Demo pages Design Review
- make gulp --production part of the automated release + remove sourcemaps
- even better support for 5.1 (fork?)
