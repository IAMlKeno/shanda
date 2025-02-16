FROM drupal:10.2

RUN apt-get update -y && apt-get install vim -y
# RUN composer require "drush/drush" "drupal/admin_toolbar:^3.4" 'drupal/views_field_view:^1.0@beta' 'drupal/webform_booking:^1.1'
RUN ln -s /opt/drupal/vendor/bin/drush /usr/bin/drush
COPY ./settings.local.php ./settings.php /opt/drupal/web/sites/default/
COPY composer.json composer.lock /opt/drupal/

# CMD ["/usr/bin/drush", "config:import", "-y"]
