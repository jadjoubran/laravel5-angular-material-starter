<?php

namespace App\Providers;

use Illuminate\Routing\Router;
use Dingo\Api\Routing\Router as ApiRouter;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to the controller routes in your routes file.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    public function boot(Router $router)
    {
        //

        parent::boot($router);
    }

    /**
     * Define the routes for the application.
     *
     * @param  \Illuminate\Routing\Router  $router
     * @return void
     */
    public function map(Router $router, ApiRouter $apiRouter)
    {
        $apiRouter->version('v1', function ($apiRouter) use ($router) {
            $apiRouter->group(['namespace' => $this->namespace], function ($api) use ($router){
                $router->group(['namespace' => $this->namespace], function ($router) use ($api) {
                    require app_path('Http/routes.php');
                });
            });
        });
    }
}
