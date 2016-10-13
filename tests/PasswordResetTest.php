<?php

use App\PasswordReset;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PasswordResetTest extends TestCase
{
    use DatabaseTransactions;

    public function testSendEmailWithTokenForResetPassword()
    {
        $user = factory(App\User::class)->create();

        $this->checkEmailContent([
            'title'   => 'Password reset link',
            'email'   => $user->email,
            'content' => 'reset password link', //contains
        ]);

        $this->post('/api/auth/password/email', ['email' => $user->email])
        ->seeApiSuccess();
    }

    public function testVerifyTokenSuccessfully()
    {
        $reset = factory(PasswordReset::class)->create();

        $this->get("/api/auth/password/verify?email={$reset->email}&token={$reset->token}")
             ->seeApiSuccess();
    }

    public function testVerifyTokenUnsuccessfully()
    {
        $reset = factory(PasswordReset::class)->create();

        $this->get('/api/auth/password/verify', [
            'email' => $reset->email,
            'token' => str_random(10),
            ])
            ->seeValidationError();
    }

    public function testResetPasswordWithTokenSuccessfully()
    {
        $user = factory(App\User::class)->create();
        $reset = factory(PasswordReset::class)->create([
            'email' => $user->email,
        ]);

        $newPassword = str_random(10);

        $this->post('/api/auth/password/reset', [
            'email'                 => $reset->email,
            'token'                 => $reset->token,
            'password'              => $newPassword,
            'password_confirmation' => $newPassword,
        ])
        ->seeApiSuccess();

        $user = App\User::whereEmail($reset->email)->firstOrFail();
        $this->assertTrue(Hash::check($newPassword, $user->password));
    }

    public function testResetPasswordWithTokenUnsuccessfully()
    {
        $user = factory(App\User::class)->create();
        $reset = factory(PasswordReset::class)->create([
            'email' => $user->email,
        ]);

        $newPassword = str_random(10);

        $this->post('/api/auth/password/reset', [
            'email'                 => $reset->email,
            'token'                 => str_random(10),
            'password'              => $newPassword,
            'password_confirmation' => $newPassword,
        ])
        ->seeApiError(422);
    }

    private function checkEmailContent($checks)
    {
        $mock = Mockery::mock($this->app['mailer']->getSwiftMailer());
        $this->app['mailer']->setSwiftMailer($mock);

        $mock->shouldReceive('send')
        ->withArgs([Mockery::on(function ($message) use ($checks) {
            $this->assertEquals($checks['title'], $message->getSubject());
            $this->assertSame([$checks['email'] => null], $message->getTo());
            $this->assertContains($checks['content'], $message->getBody());

            return true;
        }), Mockery::any()])->once();
    }
}
