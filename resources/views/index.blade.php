<!doctype html>
<html ng-app="app">
<head>
	<link rel="stylesheet" href="/css/vendor.css">
	<link rel="stylesheet" href="/css/all.css">

	<meta name="csrf-token" content="{{ csrf_token() }}" />
</head>
<body>

	<div layout="column" layout-fill>
		<md-toolbar md-scroll-shrink>
		<div class="md-toolbar-tools">
			<h3>
				<span>Laravel 5 Angular Material Starter</span>
			</h3>
		</div>
	</md-toolbar>
	<md-content>
		<div ui-view></div>
	</md-content>
</div>

<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>

</body>
</html>