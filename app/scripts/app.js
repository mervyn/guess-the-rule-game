'use strict';

/**
 * @ngdoc overview
 * @name guessTheRuleGameApp
 * @description
 * # guessTheRuleGameApp
 *
 * Main module of the application.
 */
angular
  .module('guessTheRuleGameApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
