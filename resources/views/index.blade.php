<!doctype html>
<html ng-app="app" ng-strict-di>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel Angular Material Starter</title>

    <meta name="theme-color" content="#0690B7">

    <link rel="manifest" href="manifest.json">

    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->

    <style>
        body{
            margin: 0;
            background-color: #E9F0F3;
        }
        #app-shell{
            background-color: white;
        }
        #app-shell img{
            padding: 13px 0;
            margin-left: 5%;
        }
    </style>
</head>
<body>

    <app-shell>
        <div id="app-shell">
            <img src="img/icons/logo.svg" width="171" height="41" >
        </div>
    </app-shell>


    <noscript>
        <link rel="stylesheet" href="{!! elixir('css/vendor.css') !!}">
        <link rel="stylesheet" href="{!! elixir('css/app.css') !!}">
        <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
    </noscript>

    <script>
        var link = document.createElement("link");
        link.href = "{!! elixir('css/vendor.css') !!}";
        link.type = "text/css";
        link.rel = "stylesheet";
        document.body.appendChild(link);

        var link = document.createElement("link");
        link.href = "{!! elixir('css/app.css') !!}";
        link.type = "text/css";
        link.rel = "stylesheet";
        document.body.appendChild(link);
    </script>

    <script src="{!! elixir('js/vendor.js') !!}"></script>
    <script src="{!! elixir('js/partials.js') !!}"></script>
    <script src="{!! elixir('js/app.js') !!}"></script>

    <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/service-worker.js').then(function() {
            console.log('ServiceWorker registration successful.');
          }).catch(function(error) {
            console.error('ServiceWorker registration failed: ', error);
          });
        }
    </script>

</body>
</html>
