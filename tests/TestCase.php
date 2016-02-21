<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase
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

    /*Laravel angular material starter test helpers*/

    public function seeApiSuccess()
    {
        return $this->seeJsonContains(['errors' => false]);
    }

    public function seeValidationError()
    {
        return $this->see(422)
        ->see('"errors":{');
    }

    public function seeApiError($error_code)
    {
        return $this->see($error_code)
        ->see('"errors":{');
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
        $headers = ['AUthorization' => 'Bearer '.$this->getAuthUserToken()];

        return $this->get($uri, $headers);
    }

    public function authUserPost($uri, $parameters = [])
    {
        $uri .= '?token='.$this->getAuthUserToken();

        return $this->post($uri, $parameters);
    }

    public function authUserPut($uri, $parameters = [])
    {
        $uri .= '?token='.$this->getAuthUserToken();

        return $this->put($uri, $parameters);
    }

    public function authUserDelete($uri, $parameters = [])
    {
        $uri .= '?token='.$this->getAuthUserToken();

        return $this->delete($uri, $parameters);
    }

    public function authUserCall($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
    {
        $uri .= '?token='.$this->getAuthUserToken();

        return $this->call($method, $uri, $parameters, $cookies, $files, $server, $content);
    }

    public function seeJsonKeyValue($key, $value)
    {
        return $this->see('"'.$key.'":'.$value);
    }

    public function seeJsonKeyValueString($key, $value)
    {
        return $this->see('"'.$key.'":"'.$value.'"');
    }
}
