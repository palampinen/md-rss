'use strict';

/**
 * @ngdoc overview
 * @name materialogApp
 * @description
 * # materialogApp
 *
 * Main module of the application.
 */
angular
  .module('materialogApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ngMaterial'
  ])
  .config(function ($locationProvider, $routeProvider,$mdThemingProvider) {
  
    //$locationProvider.html5Mode(true);
  


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $mdThemingProvider.theme('default')
    .primaryColor('pink')
    .accentColor('indigo');


  })
