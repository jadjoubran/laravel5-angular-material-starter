<!doctype html>
<html ng-app="app">
<head>
	<link rel="stylesheet" href="/css/vendor.css">
	<link rel="stylesheet" href="/css/all.css">

	<meta name="csrf-token" content="{{ csrf_token() }}" />
</head>
<body>

	<md-button>title1</md-button>
	
	<div ui-view></div>

	<script src="/js/vendor.js"></script>
	<script src="/js/app.js"></script>
</body>
</html>
