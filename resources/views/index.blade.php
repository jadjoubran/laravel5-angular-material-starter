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
        }
        #app-shell-header{
            background-color: white;
            height: 64px;
        }
        #app-shell-header img{
            padding: 13px 0;
            margin-left: 5%;
        }
        #app-shell-content{
            background-color: #00A4C6;
            min-height: 600px;
        }
    </style>
</head>
<body>

    <app-shell>
        <div id="app-shell-header">
            <img src="img/icons/logo.svg" width="171" height="41">
        </div>
        <div id="app-shell-content"></div>
    </app-shell>

    <app-view></app-view>

    <script async defer>
        var link = document.createElement("link");
        link.href = "{!! elixir('css/final.css') !!}";
        link.type = "text/css";
        link.rel = "stylesheet";
        document.body.appendChild(link);
    </script>

    <script src="{!! elixir('js/final.js') !!}" async defer></script>

    <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
          .register('/service-worker.js')
          .then(function(){}).catch(function(){});
        }
    </script>

</body>
</html>
