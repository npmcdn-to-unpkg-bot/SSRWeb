'use strict';

angular.module('smartSchoolRideApp.auth', ['smartSchoolRideApp.constants',
    'smartSchoolRideApp.util', 'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
