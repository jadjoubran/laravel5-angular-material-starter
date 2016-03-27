<?php

namespace App\Providers;

use Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success', function ($data) {
            return Response::json([
                'errors'  => false,
                 'data' => $data,
                ]);
        });

        Response::macro('error', function ($message, $status = 400) {
            return Response::json([
            'message'         => $status.' error',
            'errors'          => [
            'message'         => [$message],
            ],
            'status_code'     => $status,
            ], $status);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
