'use strict';

/**
 * @ngdoc overview
 * @name hw2App
 * @description
 * # hw2App
 *
 * Main module of the application.
 */
angular
  .module('ComingSoonApp', [
      'ngAnimate',
      'ngCookies',
      'ngRoute',
      'firebase'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/ranking', {
        templateUrl: 'views/ranking.html',
        controller: 'RankingCtrl',
        controllerAs: 'ranking'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.hashPrefix('');
  });
