'use strict';

angular.module('smartSchoolRideApp',
  [
    'smartSchoolRideApp.auth',
    'smartSchoolRideApp.admin',
    'smartSchoolRideApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'btford.socket-io',
    'validation.match',
    'ngTouch',
    'ngMessages',
    'ngAria',
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'toastr',
    'ngMap'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/login/admin'
    });

    $locationProvider.html5Mode(true);
  });
