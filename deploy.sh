#!/usr/bin/env bash

#ssh to your server here
git pull
composer install --no-dev
php artisan migrate --force
php artisan route:cache
php artisan config:cache
php artisan optimize
