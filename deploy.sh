#!/usr/bin/env bash

#ssh to your server here
php artisan route:clear
php artisan config:clear
git pull
composer install --no-dev
php artisan migrate
php artisan route:cache
php artisan config:cache
php artisan optimize
