<?php

namespace App\Http\Controllers;

use Dingo\Api\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Dingo\Api\Exception\ValidationHttpException;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /*Fixes dingo/api form request validation https://github.com/dingo/api/wiki/Errors-And-Error-Responses#form-requests*/
    public function validate(Request $request, array $rules, array $messages = [], array $customAttributes = [])
    {
        $validator = $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            throw new ValidationHttpException($validator->errors());
        }
    }
}
