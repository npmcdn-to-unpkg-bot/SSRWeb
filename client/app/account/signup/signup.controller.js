'use strict';

class SignupController {
  //end-non-standard



  constructor(Auth, $location) {
      this.Auth = Auth;
      this.$location = $location;
    this.user = {};
    this.date = new Date();

    Auth.getCurrentUser(function (user) {
      if (Object.getOwnPropertyNames(user).length !== 0) {
        $location.path('/');
      }
    });
  }

  //start-non-standard
  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          role: 'parent'
        })
        .then(() => {
        // Account created, redirect to home
        this.$location.path('/');
    })
    .catch(err => {
        err = err.data;
      this.errors = {};

      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.errors, (error, field) => {
        form[field].$setValidity('mongoose', false);
      this.errors[field] = error.message;
    });
    });
    }
  }

  goSignInPage() {
    this.$location.path('/login/parent');
  }
}

angular.module('smartSchoolRideApp')
  .controller('SignupController', SignupController);
