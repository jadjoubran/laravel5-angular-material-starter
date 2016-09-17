<?php


class LaravelRoutesTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testLandingResponseCode()
    {
        $response = $this->call('GET', '/');

        $this->assertEquals(200, $response->status());
    }

    public function testUnsupportedBrowserPage()
    {
        $this->visit('/unsupported-browser')
             ->see('update your browser')
             ->see('Internet Explorer');
    }
}
