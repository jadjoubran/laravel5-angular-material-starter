<?php

class ConfigRouteCacheTest extends TestCase
{
    /*
    These 2 tests are used in order to be able to safely deploy using deploy.sh
    */

    public function testRouteCache()
    {
        $exitCode = Artisan::call('route:cache');
        $this->assertEquals($exitCode, 0);

        $exitCode = Artisan::call('route:clear');
        $this->assertEquals($exitCode, 0);
    }

    public function testConfigCache()
    {
        $exitCode = Artisan::call('config:cache');
        $this->assertEquals($exitCode, 0);

        $exitCode = Artisan::call('config:clear');
        $this->assertEquals($exitCode, 0);
    }
}
