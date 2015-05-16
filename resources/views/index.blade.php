<!doctype html>
<html ng-app="app">
<head>
	<link rel="stylesheet" href="/css/vendor.css">
	<link rel="stylesheet" href="/css/all.css">

</head>
<body>
	{{-- Sent on every API call with Restangular (see angular/config/restangular.js) --}}
	<input type="hidden" id="csrf-token" value="{{ csrf_token() }}" />

	<div layout="column" layout-fill>
		<md-toolbar md-scroll-shrink>
			<div class="md-toolbar-tools">
				<h3>
					<span>Laravel 5 Angular Material Starter</span>
				</h3>
			</div>
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