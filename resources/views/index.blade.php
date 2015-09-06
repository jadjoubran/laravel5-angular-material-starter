<!doctype html>
<html ng-app="app">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="{!! asset('css/vendor.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/prism.css') !!}">
    <link href='//fonts.googleapis.com/css?family=Roboto:500,400' rel='stylesheet' type='text/css'>
    <title>Laravel 5 angular material starter</title>
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->
</head>
<body layout="row">

<md-sidenav
        class="Sidebar md-sidenav-left md-whiteframe-z2"
        ui-view="sidebar"
        ng-controller="SidebarCtrl"
        md-component-id="left"
        md-is-locked-open="$mdMedia('gt-sm')"
        tabindex="-1">
</md-sidenav>

<div flex role="main" layout="column" tabindex="-1">
    <md-toolbar class="Header md-accent md-whiteframe-z1"
                ui-view="header"
                layout="column"
                ng-controller="HeaderCtrl">
    </md-toolbar>
    <md-content
            class="Page"
            ui-view="main"
            layout="column"
            layout-align="start center"
            layout-padding flex md-scroll-y>
    </md-content>
</div>

<script src="{!! asset('js/vendor.js') !!}"></script>
<script src="{!! asset('js/app.js') !!}"></script>
<script src="{!! asset('js/prism.js') !!}"></script>

{{--livereload--}}
@if ( Config::get('app.debug') )
    <script type="text/javascript">
        document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
    </script>
@endif
</body>
</html>
