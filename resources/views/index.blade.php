<!doctype html>
<html ng-app="app">
<head>
    <link rel="stylesheet" href="/css/vendor.css">
    <link rel="stylesheet" href="/css/app.css">
    <title>Laravel 5 angular material starter</title>
</head>
<body>

<div layout="column" layout-fill>
    <md-toolbar md-scroll-shrink layout="row" layout-align="space-around center">
        <div class="md-toolbar-tools">
            <h3>
                <span>Laravel 5 Angular Material Starter</span>
            </h3>
        </div>
        <div style="padding-right:30px;">
            <a class="github-button" href="https://github.com/jadjoubran/laravel5-angular-material-starter/stargazers"
               data-icon="octicon-star" data-style="mega"
               data-count-href="/jadjoubran/laravel5-angular-material-starter/stargazers"
               data-count-api="/repos/jadjoubran/laravel5-angular-material-starter#stargazers_count"
               data-count-aria-label="# stargazers on GitHub"
               aria-label="Star jadjoubran/laravel5-angular-material-starter on GitHub">Star</a>
        </div>
        <script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
    </md-toolbar>
    <md-content>
        <div ui-view="main"></div>
    </md-content>
</div>

<div ui-view="footer"></div>

<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>

</body>
</html>