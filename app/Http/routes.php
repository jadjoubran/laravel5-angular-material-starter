<?php

Route::get('/', 'AngularController@serveApp');

Route::get('/unsupported-browser', 'AngularController@unsupported');

$api->group([], function ($api) {

    $api->post('users/login', 'LoginController@login');

});

//protected routes with JWT (must be logged in to access any of these routes)
$api->group(['middleware' => 'api.auth'], function ($api) {

    $api->get('sample/protected', 'LoginController@protectedData');

});
