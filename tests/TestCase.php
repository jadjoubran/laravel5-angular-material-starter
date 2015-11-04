<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    protected $authUser = null;

    protected $authUserToken = null;

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        //login the authUser using JWT and store the token
        $this->setAuthUserToken();

        return $app;
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
        return $this->see('"'.$entity.'"');
    }

    public function seeJsonArray($entity)
    {
        return $this->see('"'.$entity.'":[');
    }

    public function seeJsonObject($entity)
    {
        return $this->see('"'.$entity.'":{');
    }

    private function setAuthUserToken()
    {
        $authUser = factory(App\User::class)->create();

        $this->authUser = $authUser;
        $this->authUserToken = JWTAuth::fromUser($authUser);
    }

    public function authUserGet($url, $data = [])
    {
        $url .= '?token='.$this->authUserToken;

        return $this->get($url, $data);
    }

    public function authUserPost($url, $data = [])
    {
        $url .= '?token='.$this->authUserToken;

        return $this->post($url, $data);
    }

    public function authUserPut($url, $data = [])
    {
        $url .= '?token='.$this->authUserToken;

        return $this->put($url, $data);
    }

    public function authUserDelete($url, $data = [])
    {
        $url .= '?token='.$this->authUserToken;

        return $this->delete($url, $data);
    }

    public function authUserCall($verb, $url, $data = [])
    {
        $url .= '?token='.$this->authUserToken;

        return $this->call($verb, $url, $data);
    }
}
