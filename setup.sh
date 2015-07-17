#!/usr/bin/env bash
cp .env.example .env
npm install -g gulp bower
composer install
npm install
bower install
gulp
echo "Don't forget to fix the database connection string in your .env file"