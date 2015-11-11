<?php

Route::get('/', 'AngularController@serveApp');

Route::get('/unsupported-browser', 'AngularController@unsupported');

$api->version('v1', function ($api) {

    $api->controller('authenticate', 'AuthenticateController');

});

//protected with JWT
$api->version('v1', ['middleware' => 'api.auth'], function ($api) {

});
