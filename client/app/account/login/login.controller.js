'use strict';

class LoginController {
  constructor(Auth, $location, $routeParams, appConfig) {
    this.user = {};
    this.errors = {};
    this.submitted = false;
    this.date = new Date();

    // modal
    this.isForgot = false;
    this.forgotEmailSent = false;

    // authentication
    this.Auth = Auth;
    this.$location = $location;

    this.user.role = $routeParams.userRole;

    Auth.getCurrentUser(function (user) {
      if (Object.getOwnPropertyNames(user).length !== 0) {
        $location.path('/');
      } else {
        if (appConfig.userRoles.indexOf(user.role) <= -1) {
          $location.path('/login/admin');
        }
      }
    });
  }

  formLogin(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
        // Logged in, redirect to home
          this.$location.path('/');
      })
      .catch(err => {
          this.errors.other = err.message;
      });
    }
  }

  showForgotPasswordDialog() {
    this.forgotEmailSent = false;
    this.isForgot = true;
  }

  showSignInDialog() {
    this.forgotEmailSent = false;
    this.isForgot = false;
  }

  goSignupPage() {
    this.$location.path('/signup/parent');
  }
}

angular.module('smartSchoolRideApp')
  .controller('LoginController', LoginController);
