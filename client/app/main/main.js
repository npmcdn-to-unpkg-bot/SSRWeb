'use strict';

angular.module('smartSchoolRideApp')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      template: '<main></main>',
      controller: function ($location, $route, Auth) {
        Auth.getCurrentUser(function (user) {
          if (Object.getOwnPropertyNames(user).length === 0) {
            $location.path('/login/admin');
          }
        });
      }
    });
  });
