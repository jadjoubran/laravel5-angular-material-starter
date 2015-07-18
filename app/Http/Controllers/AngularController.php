<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AngularController extends Controller{

	public function serveApp(){
		return view('index');
	}
}
