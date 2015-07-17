<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function (){
	return view('index');
});


Route::group(['prefix' => 'api/1/'], function (){

	/*
	 * used for Json Web Token Authentication - https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps
	 * Make sure to re-enable Csrf middleware if you're disabling JWT
	 * Also don't forget to run `php artisan jwt:generate` to generate a new token (already part of setup.sh)
	 * */
	Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
	Route::post('authenticate', 'AuthenticateController@authenticate');

});