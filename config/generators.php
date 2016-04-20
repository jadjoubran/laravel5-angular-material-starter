<?php

return [
      'source' => [
            'root'            => 'angular',
            'page'            => 'app/pages',
            'components'      => 'app/components',
            'directives'      => 'directives',
            'config'          => 'config',
            'dialogs'         => 'dialogs',
            'filters'         => 'filters',
            'services'        => 'services',
      ],
      'prefix' => [
            'component'       => '.component.js',
            'componentView'   => '.component.html',
            'dialog'          => '.dialog.js',
            'dialogView'      => '.dialog.html',
            'directive'       => '.directive.js',
            'service'         => '.service.js',
            'config'          => '.config.js',
            'filter'          => '.filter.js',
            'pageView'        => '.page.html',
      ],
      'tests' => [
            'enable' => [
                'components'      => true,
                'services'        => true,
                'directives'      => true,
            ],
            'source' => [
                'root'            => 'tests/angular/',
                'components'      => 'app/components',
                'directives'      => 'directives',
                'services'        => 'services',
            ],
      ],
      'misc' => [
            'auto_import' => true,
      ],
];
