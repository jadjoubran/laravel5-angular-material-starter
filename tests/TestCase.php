<?php

abstract class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    private $authUser = null;

    private $authUserToken = null;

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    public function getAuthUser()
    {
        if (! $this->authUser) {
            $this->setAuthUserToken();
        }

        return $this->authUser;
    }

    public function getAuthUserToken()
    {
        if (! $this->authUserToken) {
            $this->setAuthUserToken();
        }

        return $this->authUserToken;
    }

    public function seeApiSuccess()
    {
        return $this->seeJsonContains(['errors' => false]);
    }

    public function seeValidationError()
    {
        $this->assertResponseStatus(422);

        return $this->see('"errors":{');
    }

    public function seeApiError($error_code)
    {
        $this->assertResponseStatus($error_code);

        return $this->see('"errors":{');
    }

    public function seeJsonKey($entity)
    {
        return $this->see('"'.$entity.'":');
    }

    public function seeJsonValue($value)
    {
        return $this->see('"'.$value.'"');
    }

    public function seeJsonArray($entity)
    {
        return $this->see('"'.$entity.'":[');
    }

    public function seeJsonObject($entity)
    {
        return $this->see('"'.$entity.'":{');
    }

    /**
     * login the authUser using JWT and store the token.
     */
    private function setAuthUserToken()
    {
        $authUser = factory(App\User::class)->create();

        $this->authUser = $authUser;
        $this->authUserToken = JWTAuth::fromUser($authUser);
    }

    public function authUserGet($uri, $headers = [])
    {
        if (! isset($headers['Authorization'])) {
            $headers['Authorization'] = 'Bearer '.$this->getAuthUserToken();
        }

        return $this->get($uri, $headers);
    }

    public function authUserPost($uri, $parameters = [], $headers = [])
    {
        if (! isset($headers['Authorization'])) {
            $headers['Authorization'] = 'Bearer '.$this->getAuthUserToken();
        }

        return $this->post($uri, $parameters, $headers);
    }

    public function authUserPut($uri, $parameters = [], $headers = [])
    {
        if (! isset($headers['Authorization'])) {
            $headers['Authorization'] = 'Bearer '.$this->getAuthUserToken();
        }

        return $this->put($uri, $parameters, $headers);
    }

    public function authUserDelete($uri, $parameters, $headers)
    {
        if (! isset($headers['Authorization'])) {
            $headers['Authorization'] = 'Bearer '.$this->getAuthUserToken();
        }

        return $this->delete($uri, $parameters, $headers);
    }

    public function authUserCall($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
    {
        if (! isset($parameters['Authorization'])) {
            $parameters['Authorization'] = 'Bearer '.$this->getAuthUserToken();
        }

        return $this->call($method, $uri, $parameters, $cookies, $files, $server, $content);
    }
}
