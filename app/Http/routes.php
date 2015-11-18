<?php

Route::get('/', 'AngularController@serveApp');

Route::get('/unsupported-browser', 'AngularController@unsupported');

$api->version('v1', function ($api) {

    $api->post('users/login', 'LoginController@login');

});

//protected routes with JWT (must be logged in to access any of these routes)
$api->version('v1', ['middleware' => 'api.auth'], function ($api) {

    $api->get('sample/protected', 'LoginController@protectedData');

});
