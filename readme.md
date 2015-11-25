## Laravel 5.1 Angular Material Starter
> Version 2.10

[![Latest Stable Version](https://poser.pugx.org/jadjoubran/laravel5-angular-material-starter/v/stable)](https://packagist.org/packages/jadjoubran/laravel5-angular-material-starter)
[![Latest Unstable Version](https://poser.pugx.org/jadjoubran/laravel5-angular-material-starter/v/unstable)](https://packagist.org/packages/jadjoubran/laravel5-angular-material-starter)
[![Build Status](https://travis-ci.org/jadjoubran/laravel5-angular-material-starter.svg?branch=master)](https://travis-ci.org/jadjoubran/laravel5-angular-material-starter)
[![StyleCI](https://styleci.io/repos/34944760/shield)](https://styleci.io/repos/34944760)
[![Code Climate](https://codeclimate.com/github/jadjoubran/laravel5-angular-material-starter/badges/gpa.svg)](https://codeclimate.com/github/jadjoubran/laravel5-angular-material-starter)
[![License](https://poser.pugx.org/jadjoubran/laravel5-angular-material-starter/license)](https://packagist.org/packages/jadjoubran/laravel5-angular-material-starter)

<a href="https://infinite-dusk-3948.herokuapp.com/" target="_blank">View DEMO</a>

![Laravel & Angular](https://i.imgur.com/ZbLzOPP.jpg)


##### Table of Contents
[Overview](#overview)  
[Installation](#installation)  
[Issues, questions and feature requests](#issues)  
[Planned features](#planned_features)  
[Upcoming Version 3](#version_3)   
[Do It Yourself](#DIY)  
[Contributing](#contributing)

<a name="overview"></a>
## OVERVIEW
This is a starter project that gives you an out of the box configuration Laravel 5.1 and AngularJS (folder by feature architecture).
Here are the goodies that you'll get:

* Laravel 5.1
* Angular
* Angular Material
* Blazing fast Elixir 3.0 configuration with custom tasks
* artisan generators for angular (artisan ng:feature name, artisan ng:dialog name, etc..)
* check out the full <a href="http://laravel-ng-material.elasticbeanstalk.com/#/" target="_blank">list of features</a>


<a name="installation"></a>
## Installation


Heads up for Windows + Vagrant users: Start by applying the fix in [issue #61](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/61#issuecomment-145564131)

```bash
composer create-project jadjoubran/laravel5-angular-material-starter --prefer-dist
cd laravel5-angular-material-starter
#fix database credentials in .env
npm install -g gulp bower
npm install
bower install
php artisan migrate
gulp && gulp watch
php artisan serve
```

* You're ready to go! <a href="http://localhost:8000" target="_blank">http://localhost:8000</a>
* Star the repo and submit your feedback as a new issue or to <a href="https://twitter.com/joubranjad" target="_blank">@JoubranJad</a>

<a name="issues"></a>
## Issues, questions and feature requests
Open a new issue, I'd love to help.


<a name="planned_features"></a>
## Planned features

Moved to [github issues](https://github.com/jadjoubran/laravel5-angular-material-starter/issues/). 

<a name="contributing"></a>
## Upcoming Version 3

Development of Version 3 is ongoing.  
In version 3, Laravel Angular Material Starter aims to be the starting point of future Laravel & Angular apps.
We won't be including a library or a behavior by default, unless we're sure that this is something absolutely necessary. We're also moving towards a recipes/plugins architecture to come up with easy solutions for common scenarios (SEO, Web Sockets, etc).

If you're interested in following the progress or testing new features, checkout the official [trello board](https://trello.com/b/tZ997reo/laravel-angular-material-starter).

<a name="DIY"></a>
## Do It Yourself

A nice article on <a href="http://www.sitepoint.com/flexible-and-easily-maintainable-laravel-angular-material-apps/" target="_blank">sitepoint</a> that explains the first few versions of this repository. Recommended read if you're not familiar with the underlying technologies.

<a name="contributing"></a>
## Contributing

Thank you for contributing to this repository.

Here are the guidelines:

```bash
#setup jshint
npm install -g jshint
```

1. run `jshint angular/**/*.js` to make sure that your javascript code is linted.
2. run `gulp --production` at the end if you changed any HTML, Less or JS. Do not send Pull Requests without running this command (unless you haven't touched the frontend)
3. delete `.map` files `rm public/css/app.css.map public/css/vendor.css.map public/js/app.map public/js/vendor.js.map`
4. If you are adding/modifying backend functionality, make sure to include the apprioriate `test`. Let me know if you need help writing the test

