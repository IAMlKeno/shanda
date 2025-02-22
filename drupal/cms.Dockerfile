FROM drupal:10.2

RUN apt-get update -y && apt-get install vim -y
RUN ln -s /opt/drupal/vendor/bin/drush /usr/bin/drush
COPY ./settings.local.php ./settings.php /opt/drupal/web/sites/default/
COPY composer.json composer.lock /opt/drupal/
RUN composer install --no-interaction
