<?php

namespace App\Http\Controllers;

use Config;
use App\User;
use GuzzleHttp;
use Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->error('Invalid credentials', Response::HTTP_UNAUTHORIZED);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->error('Could not create token', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->success(['token' => $token]);
    }

    public function protectedData()
    {
        return response()->success(['sample', 'of', 'jwt', 'protected', 'data', '[', 'response', 'from', 'API', ']']);
    }

    /**
     * Unlink provider.
     */
    public function unlink(Request $request, $provider)
    {
        $user = User::find($request['user']['sub']);

        if (! $user) {
            return response()->error('User not found', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->$provider = '';
        $user->save();

        return response()->json(['token' => $this->createToken($user)]);
    }

    /**
     * Create Email and Password Account.
     */
    public function signup(Request $request)
    {
        $auth = new AuthController();
        $validator = $auth::validator($request->all());

        if ($validator->fails()) {
            return response()->error($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = $auth::create($request->all());

        return response()->json(['token' => $this->createToken($user)]);
    }

    /**
     * Login with GitHub.
     */
    public function github(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => Config::get('app.github_secret'),
            'redirect_uri' => $request->input('redirectUri'),
        ];

        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://github.com/login/oauth/access_token', [
            'query' => $params,
        ]);

        $accessToken = [];
        parse_str($accessTokenResponse->getBody(), $accessToken);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://api.github.com/user', [
            'headers' => ['User-Agent' => 'Satellizer'],
            'query' => $accessToken,
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization')) {
            $user = User::where('github', '=', $profile['id']);

            if ($user->first()) {
                return response()->json(['message' => 'There is already a GitHub account that belongs to you'], 409);
            }

            $token = explode(' ', $request->header('Authorization'))[1];
            $payload = (array) JWTAuth::decode($token, Config::get('app.jwt_secret'), ['HS256']);

            $user = User::find($payload['sub']);
            $user->github = $profile['id'];
            $user->displayName = $user->displayName ?: $profile['name'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        }
        // Step 3b. Create a new user account or return an existing one.
        else {
            $user = User::where('github', '=', $profile['id']);

            if ($user->first()) {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user = new User;
            $user->github = $profile['id'];
            $user->displayName = $profile['name'];
            $user->save();

            return response()->json(['token' => $this->createToken($user)]);
        }
    }
}
