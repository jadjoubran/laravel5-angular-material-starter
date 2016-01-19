<?php

Route::get('/', 'AngularController@serveApp');
Route::get('/unsupported-browser', 'AngularController@unsupported');

Route::group(['prefix' => 'auth'], function () {
    // Authentication routes...
    Route::post('login', 'LoginController@login');

    // Registration routes...
    Route::post('register', 'LoginController@signup');

    // Satellizer OAuth Routes
    Route::post('twitter', 'LoginController@twitter');
    Route::post('facebook', 'LoginController@facebook');
    Route::post('foursquare', 'LoginController@foursquare');
    Route::post('instagram', 'LoginController@instagram');
    Route::post('github', 'LoginController@github');
    Route::post('google', 'LoginController@google');
    Route::post('linkedin', 'LoginController@linkedin');

    Route::get('unlink/{provider}', 'LoginController@unlink');
});

// Protected routes with JWT (must be logged in to access any of these routes)
// adjust the domain parameter accordingly
$api->group(['middleware' => 'api.auth', 'domain' => 'localhost'], function ($api) {

    $api->get('sample/protected', 'LoginController@protectedData');

});
