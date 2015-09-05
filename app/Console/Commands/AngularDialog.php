<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class AngularDialog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ng:dialog {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new dialog in angular/dialog';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $name = $this->argument('name');
        $studly_name = studly_case($name);
        $human_readable = ucfirst(str_replace('_', ' ', $name));

        $html = file_get_contents(__DIR__.'/Stubs/AngularDialog/dialog.html.stub');
        $js = file_get_contents(__DIR__.'/Stubs/AngularDialog/dialog.js.stub');

        $html = str_replace('{{StudlyName}}', $studly_name, $html);
        $js = str_replace('{{StudlyName}}', $studly_name, $js);
        $html = str_replace('{{HumanReadableName}}', $human_readable, $html);

        $folder = __DIR__.'/../../../angular/dialogs/'.$name;
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

        $this->info('Dialog created successfully.');
    }
}
