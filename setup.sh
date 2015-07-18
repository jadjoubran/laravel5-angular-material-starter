#!/usr/bin/env bash
php artisan jwt:generate
cp .env.example .env
npm install -g gulp bower
composer update
npm install
bower install
gulp
echo "Don't forget to fix the database connection string in your .env file"