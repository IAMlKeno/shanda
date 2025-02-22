<?php

declare(strict_types=1);

namespace Drupal\shanda\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Session\AccountProxy;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns responses for Shanda user controller routes.
 */
final class ShandaUserController extends ControllerBase {

  /**
   * ShandaUserController constructor.
   */
  public function __construct(protected $currentUser) {}

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('current_user')
    );
  }

  /**
   * Builds the response.
   */
  public function __invoke(): array {

    $build['content'] = [
      '#type' => 'item',
      '#markup' => $this->t('It works!'),
    ];

    return $build;
  }

  /**
   * Provides an endpoint for to redirect user's homepage
   * base on their role (or lack thereof).
   *
   * @return RedirectResponse
   */
  public function user() {
    $url;
    $userRoles = $this->currentUser->getRoles();

    if (in_array('service_provider', $userRoles)) {
      $url = 'shanda.provider_dashboard';
    }
    else if (in_array('requester', $userRoles)) {
      $url = 'shanda.requester_dashboard';
    }
    else {
      $url = 'shanda.welcome';
    }

    return $this->redirect($url);
  }

}
