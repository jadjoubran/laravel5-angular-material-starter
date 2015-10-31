<!doctype html>
<html ng-app="app">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="{!! asset('css/vendor.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app.css') !!}">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/g/prism@1.3.0(themes/prism.css+themes/prism-okaidia.css+plugins/show-language/prism-show-language.css+plugins/line-numbers/prism-line-numbers.css)">
    <link href='//fonts.googleapis.com/css?family=Roboto:500,400' rel='stylesheet' type='text/css'>
    <title>Laravel 5 angular material starter</title>
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->
</head>
<body layout="row">

<!-- Sidenav component -->
<md-sidenav
        class="Sidebar md-sidenav-left md-whiteframe-z2"
        md-component-id="left"
        md-is-locked-open="$mdMedia('gt-md')"
        tabindex="-1">

    <!-- Sidebar header/branding -->
    <md-toolbar class="Sidebar-header">
        <h1 class="md-toolbar-tools Sidebar-title">Laravel 5 angular<br>material starter</h1>
        <h6 class="Sidebar-version">
            <a target="_blank" href="https://github.com/jadjoubran/laravel5-angular-material-starter/releases">version 3 - alpha</a>
        </h6>
    </md-toolbar>

    <!-- Sidebar menu items -->
    <md-content
            class="Sidebar-pages md-default-theme"
            ui-view="sidebar"
            ng-controller="SidebarCtrl">
    </md-content>
</md-sidenav>

<div flex role="main" layout="column" tabindex="-1">
    <md-toolbar class="Header md-accent md-whiteframe-z1" layout="column">
        <div ui-view="header" ng-controller="HeaderCtrl"></div>
    </md-toolbar>
    <md-content layout="column" flex md-scroll-y>
        <div ui-view="main" class="Page"></div>
    </md-content>
</div>

<script src="{!! asset('js/vendor.js') !!}"></script>
<script src="{!! asset('js/app.js') !!}"></script>
<script src="//cdn.jsdelivr.net/g/prism@1.3.0(prism.js+components/prism-css.min.js+components/prism-php.min.js+components/prism-bash.min.js+components/prism-javascript.min.js+components/prism-markup.min.js+plugins/show-language/prism-show-language.min.js)"></script>

{{--livereload--}}
@if ( env('APP_ENV') === 'local' )
    <script type="text/javascript">
        document.write('<script src="'+ location.protocol + '//' + (location.host || 'localhost') +':35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
    </script>
@endif
</body>
</html>
