<?php

$databases['default']['default'] = array (
  'database' => 'shanda',
  'username' => 'user',
  'password' => 'password',
  'prefix' => '',
  'host' => 'shanda_db',
  'port' => '3306',
  'isolation_level' => 'READ COMMITTED',
  'driver' => 'mysql',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);
$settings['config_sync_directory'] = '../config/sync';
