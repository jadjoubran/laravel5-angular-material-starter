<?php

Route::get('/', 'AngularController@serveApp');
Route::get('/unsupported-browser', 'AngularController@unsupported');


$api->group(['prefix' => 'auth'], function ($api) {
     // Authentication routes...
     $api->post('login', 'LoginController@postLogin');

    // Registration routes...
    $api->post('register', 'AuthLoginController@signup');

    // Satellizer OAuth Routes
    $api->post('twitter', 'LoginController@twitter');
    $api->post('facebook', 'LoginController@facebook');
    $api->post('foursquare', 'LoginController@foursquare');
    $api->post('instagram', 'LoginController@instagram');
    $api->post('github', 'LoginController@github');
    $api->post('google', 'LoginController@google');
    $api->post('linkedin', 'LoginController@linkedin');

});

//protected routes with JWT (must be logged in to access any of these routes)
$api->group(['middleware' => 'api.auth'], function ($api) {

 	   $api->get('sample/protected', 'LoginController@protectedData');

	   // Satellizer Route
	   $api->get('unlink/{provider}', 'AuthController@unlink');

});
