<!doctype html>
<html ng-app="app">
<head>
    <link rel="stylesheet" href="/css/vendor.css">
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/prism.css">
    <link href='http://fonts.googleapis.com/css?family=Roboto:500,400' rel='stylesheet' type='text/css'>
    <title>Laravel 5 angular material starter</title>
</head>
<body>

<header ui-view="header"></header>
<div ui-view="sidebar"></div>
<div ui-view="main" class="Page"></div>

<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>
<script src="/js/prism.js"></script>

</body>
</html>