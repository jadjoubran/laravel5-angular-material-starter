<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class AngularFeature extends Command
{
    /**
     * The name and signature of the console command.
     * @var string
     */
    protected $signature = 'ng:feature {name}';

    /**
     * The console command description.
     * @var string
     */
    protected $description = 'Create a new feature in angular/app';

    /**
     * Create a new command instance.
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     * @return mixed
     */
    public function handle()
    {
        $name = $this->argument('name');
        $studly_name = studly_case($name);

        $html = file_get_contents(__DIR__.'/Stubs/AngularFeature/feature.html.stub');
        $js = file_get_contents(__DIR__.'/Stubs/AngularFeature/feature.js.stub');
        $less = file_get_contents(__DIR__.'/Stubs/AngularFeature/feature.less.stub');

        $html = str_replace('{{StudlyName}}', $studly_name, $html);
        $js = str_replace('{{StudlyName}}', $studly_name, $js);

        $folder = __DIR__.'/../../../angular/app/'.$name;
        if (is_dir($folder)) {
            $this->info('Folder already exists');

            return false;
        }

        //create folder
        File::makeDirectory($folder, 0775, true);

        //create view (.html)
        File::put($folder.'/'.$name.'.html', $html);

        //create controller (.js)
        File::put($folder.'/'.$name.'.js', $js);

        //create less file (.less)
        File::put($folder.'/'.$name.'.less', $less);

        $this->info('Feature created successfully.');
    }
}
