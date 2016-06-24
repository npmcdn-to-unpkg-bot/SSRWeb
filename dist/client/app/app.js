'use strict';

angular.module('smartSchoolRideApp', ['smartSchoolRideApp.auth', 'smartSchoolRideApp.admin', 'smartSchoolRideApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'btford.socket-io', 'validation.match', 'ngTouch', 'ngMessages', 'ngAria', 'restangular', 'ui.router', 'ui.bootstrap', 'toastr']).config(function ($routeProvider, $locationProvider) {
  $routeProvider.otherwise({
    redirectTo: '/login/admin'
  });

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map

'use strict';

angular.module('smartSchoolRideApp.admin', ['smartSchoolRideApp.auth', 'ngRoute']);
//# sourceMappingURL=admin.module.js.map

'use strict';

angular.module('smartSchoolRideApp.auth', ['smartSchoolRideApp.constants', 'smartSchoolRideApp.util', 'ngCookies', 'ngRoute']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map

'use strict';

angular.module('smartSchoolRideApp.util', []);
//# sourceMappingURL=util.module.js.map

'use strict';

angular.module('smartSchoolRideApp').config(function ($routeProvider) {
  $routeProvider.when('/login/:userRole', {
    templateUrl: 'app/account/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  }).when('/logout', {
    name: 'logout',
    referrer: '/',
    template: '',
    controller: function controller($location, $route, Auth) {
      var referrer = $route.current.params.referrer || $route.current.referrer || '/';
      Auth.logout();
      $location.path(referrer);
    }
  }).when('/signup/parent', {
    templateUrl: 'app/account/signup/signup.html',
    controller: 'SignupController',
    controllerAs: 'vm'
  }).when('/settings', {
    templateUrl: 'app/account/settings/settings.html',
    controller: 'SettingsController',
    controllerAs: 'vm',
    authenticate: true
  });
}).run(function ($rootScope) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
      next.referrer = current.originalPath;
    }
  });
});
//# sourceMappingURL=account.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
  function LoginController(Auth, $location, $routeParams, appConfig) {
    _classCallCheck(this, LoginController);

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

    if (appConfig.userRoles.indexOf(this.user.role) <= -1) {
      this.$location.path('/login/admin');
    }
  }

  _createClass(LoginController, [{
    key: 'formLogin',
    value: function formLogin(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password,
          role: this.user.role
        }).then(function () {
          // Logged in, redirect to home
          _this.$location.path('/');
        }).catch(function (err) {
          _this.errors.other = err.message;
        });
      }
    }
  }, {
    key: 'showForgotPasswordDialog',
    value: function showForgotPasswordDialog() {
      this.forgotEmailSent = false;
      this.isForgot = true;
    }
  }, {
    key: 'showSignInDialog',
    value: function showSignInDialog() {
      this.forgotEmailSent = false;
      this.isForgot = false;
    }
  }, {
    key: 'goSignupPage',
    value: function goSignupPage() {
      this.$location.path('/signup/parent');
    }
  }]);

  return LoginController;
}();

angular.module('smartSchoolRideApp').controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = function () {
  function SettingsController(Auth) {
    _classCallCheck(this, SettingsController);

    this.Auth = Auth;
  }

  _createClass(SettingsController, [{
    key: 'changePassword',
    value: function changePassword(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.changePassword(this.user.oldPassword, this.user.newPassword).then(function () {
          _this.message = 'Password successfully changed.';
        }).catch(function () {
          form.password.$setValidity('mongoose', false);
          _this.errors.other = 'Incorrect password';
          _this.message = '';
        });
      }
    }
  }]);

  return SettingsController;
}();

angular.module('smartSchoolRideApp').controller('SettingsController', SettingsController);
//# sourceMappingURL=settings.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupController = function () {
  //end-non-standard

  function SignupController(Auth, $location) {
    _classCallCheck(this, SignupController);

    this.Auth = Auth;
    this.$location = $location;
    this.user = {};
    this.date = new Date();
  }

  //start-non-standard


  _createClass(SignupController, [{
    key: 'register',
    value: function register(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          role: 'parent'
        }).then(function () {
          // Account created, redirect to home
          _this.$location.path('/');
        }).catch(function (err) {
          err = err.data;
          _this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            _this.errors[field] = error.message;
          });
        });
      }
    }
  }, {
    key: 'goSignInPage',
    value: function goSignInPage() {
      this.$location.path('/login/parent');
    }
  }]);

  return SignupController;
}();

angular.module('smartSchoolRideApp').controller('SignupController', SignupController);
//# sourceMappingURL=signup.controller.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AdminController = function () {
    function AdminController(User) {
      _classCallCheck(this, AdminController);

      // Use the User $resource to fetch all users
      this.users = User.query();
    }

    _createClass(AdminController, [{
      key: 'delete',
      value: function _delete(user) {
        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
      }
    }]);

    return AdminController;
  }();

  angular.module('smartSchoolRideApp.admin').controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map

'use strict';

angular.module('smartSchoolRideApp.admin').config(function ($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
});
//# sourceMappingURL=admin.router.js.map

"use strict";

(function (angular, undefined) {
	angular.module("smartSchoolRideApp.constants", []).constant("appConfig", {
		"userRoles": ["super", "admin", "parent"],
		"mainTabs": {
			"homeTab": "HOME",
			"liveTrackingTab": "LIVE TRACKING",
			"communicationsTab": "COMMUNICATIONS",
			"busInspections": "BUS INSPECTIONS",
			"reportsTab": "REPORTS",
			"settingsTab": "SET-UP & SETTINGS"
		}
	});
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http, $scope, socket, $location, Auth, appConfig) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];

      this.$location = $location;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      this.tabName = appConfig.mainTabs.homeTab;

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('thing');
      });
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/things').then(function (response) {
          _this.awesomeThings = response.data;
          _this.socket.syncUpdates('thing', _this.awesomeThings);
        });
      }
    }, {
      key: 'addThing',
      value: function addThing() {
        if (this.newThing) {
          this.$http.post('/api/things', {
            name: this.newThing
          });
          this.newThing = '';
        }
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/things/' + thing._id);
      }
    }, {
      key: 'isActive',
      value: function isActive(route) {
        return route === this.$location.path();
      }
    }]);

    return MainController;
  }();

  angular.module('smartSchoolRideApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'vm'
  });
})();
//# sourceMappingURL=main.controller.js.map

'use strict';

angular.module('smartSchoolRideApp').config(function ($routeProvider) {
  $routeProvider.when('/', {
    template: '<main></main>',
    controllerAs: 'vm',
    controller: function controller($location, $route, Auth) {
      Auth.getCurrentUser(function (user) {
        if (Object.getOwnPropertyNames(user).length === 0) {
          $location.path('/login/admin');
        }
      });
    }
  });
});
//# sourceMappingURL=main.js.map

'use strict';

angular.module('smartSchoolRideApp.UserService').service('UserService', function ($location, $http, $cookies, $q, appConfig, Util) {
  // AngularJS will instantiate a singleton by calling "new" on this function

});
//# sourceMappingURL=UserService.service.js.map

'use strict';

(function () {

  function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var userRoles = appConfig.userRoles || [];

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = User.get();
    }

    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */

      login: function login(_ref, callback) {
        var email = _ref.email;
        var password = _ref.password;
        var role = _ref.role;

        return $http.post('/auth/local', {
          email: email,
          password: password,
          role: role
        }).then(function (res) {
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        }).then(function (user) {
          safeCb(callback)(null, user);
          return user;
        }).catch(function (err) {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
      },


      /**
       * Delete access token and user info
       */
      logout: function logout() {
        $cookies.remove('token');
        currentUser = {};
      },


      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function createUser(user, callback) {
        return User.save(user, function (data) {
          $cookies.put('token', data.token);
          currentUser = User.get();
          return safeCb(callback)(null, user);
        }, function (err) {
          Auth.logout();
          return safeCb(callback)(err);
        }).$promise;
      },


      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function changePassword(oldPassword, newPassword, callback) {
        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function () {
          return safeCb(callback)(null);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },


      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function getCurrentUser(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;
        return $q.when(value).then(function (user) {
          safeCb(callback)(user);
          return user;
        }, function () {
          safeCb(callback)({});
          return {};
        });
      },


      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function isLoggedIn(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var is = user.hasOwnProperty('role');
          safeCb(callback)(is);
          return is;
        });
      },


      /**
       * Check if a user has a specified role or higher
       *   (synchronous|asynchronous)
       *
       * @param  {String}     role     - the role to check against
       * @param  {Function|*} callback - optional, function(has)
       * @return {Bool|Promise}
       */
      hasRole: function hasRole(role, callback) {
        var hasRole = function hasRole(r, h) {
          return userRoles.indexOf(r) >= userRoles.indexOf(h);
        };

        if (arguments.length < 2) {
          return hasRole(currentUser.role, role);
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var has = user.hasOwnProperty('role') ? hasRole(user.role, role) : false;
          safeCb(callback)(has);
          return has;
        });
      },


      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function isAdmin() {
        return Auth.hasRole.apply(Auth, [].concat.apply(['admin'], arguments));
      },


      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function getToken() {
        return $cookies.get('token');
      }
    };

    return Auth;
  }

  angular.module('smartSchoolRideApp.auth').factory('Auth', AuthService);
})();
//# sourceMappingURL=auth.service.js.map

'use strict';

(function () {

  function authInterceptor($rootScope, $q, $cookies, $location, Util) {
    return {
      // Add authorization token to headers

      request: function request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },


      // Intercept 401s and redirect you to login
      responseError: function responseError(response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookies.remove('token');
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('smartSchoolRideApp.auth').factory('authInterceptor', authInterceptor);
})();
//# sourceMappingURL=interceptor.service.js.map

'use strict';

(function () {

  angular.module('smartSchoolRideApp.auth').run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (!next.authenticate) {
        return;
      }

      if (typeof next.authenticate === 'string') {
        Auth.hasRole(next.authenticate, _.noop).then(function (has) {
          if (has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(function (is) {
            $location.path(is ? '/' : '/login');
          });
        });
      } else {
        Auth.isLoggedIn(_.noop).then(function (is) {
          if (is) {
            return;
          }

          event.preventDefault();
          $location.path('/');
        });
      }
    });
  });
})();
//# sourceMappingURL=router.decorator.js.map

'use strict';

(function () {

  function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('smartSchoolRideApp.auth').factory('User', UserResource);
})();
//# sourceMappingURL=user.service.js.map

'use strict';

angular.module('smartSchoolRideApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map

'use strict';

angular.module('smartSchoolRideApp').factory('Modal', function ($rootScope, $uibModal) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal() {
    var scope = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var modalClass = arguments.length <= 1 || arguments[1] === undefined ? 'modal-default' : arguments[1];

    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $uibModal.open({
      templateUrl: 'components/modal/modal.html',
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */

      delete: function _delete() {
        var del = arguments.length <= 0 || arguments[0] === undefined ? angular.noop : arguments[0];

        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click: function click(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function click(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function (event) {
            del.apply(event, args);
          });
        };
      }
    }
  };
});
//# sourceMappingURL=modal.service.js.map

'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('smartSchoolRideApp').directive('mongooseError', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function link(scope, element, attrs, ngModel) {
      element.on('keydown', function () {
        return ngModel.$setValidity('mongoose', true);
      });
    }
  };
});
//# sourceMappingURL=mongoose-error.directive.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController = function () {
  //end-non-standard

  //start-non-standard

  function NavbarController($location, Auth) {
    _classCallCheck(this, NavbarController);

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  _createClass(NavbarController, [{
    key: 'isActive',
    value: function isActive(route) {
      return route === this.$location.path();
    }
  }]);

  return NavbarController;
}();

angular.module('smartSchoolRideApp').controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map

'use strict';

angular.module('smartSchoolRideApp').directive('navbar', function () {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  };
});
//# sourceMappingURL=navbar.directive.js.map

/* global io */
'use strict';

angular.module('smartSchoolRideApp').factory('socket', function (socketFactory) {
  // socket.io now auto-configures its connection when we ommit a connection url
  var ioSocket = io('', {
    // Send auth token on connection, you will need to DI the Auth service above
    // 'query': 'token=' + Auth.getToken()
    path: '/socket.io-client'
  });

  var socket = socketFactory({
    ioSocket: ioSocket
  });

  return {
    socket: socket,

    /**
     * Register listeners to sync an array with updates on a model
     *
     * Takes the array we want to sync, the model name that socket updates are sent from,
     * and an optional callback function after new items are updated.
     *
     * @param {String} modelName
     * @param {Array} array
     * @param {Function} cb
     */
    syncUpdates: function syncUpdates(modelName, array, cb) {
      cb = cb || angular.noop;

      /**
       * Syncs item creation/updates on 'model:save'
       */
      socket.on(modelName + ':save', function (item) {
        var oldItem = _.find(array, {
          _id: item._id
        });
        var index = array.indexOf(oldItem);
        var event = 'created';

        // replace oldItem if it exists
        // otherwise just add item to the collection
        if (oldItem) {
          array.splice(index, 1, item);
          event = 'updated';
        } else {
          array.push(item);
        }

        cb(event, item, array);
      });

      /**
       * Syncs removed items on 'model:remove'
       */
      socket.on(modelName + ':remove', function (item) {
        var event = 'deleted';
        _.remove(array, {
          _id: item._id
        });
        cb(event, item, array);
      });
    },


    /**
     * Removes listeners for a models updates on the socket
     *
     * @param modelName
     */
    unsyncUpdates: function unsyncUpdates(modelName) {
      socket.removeAllListeners(modelName + ':save');
      socket.removeAllListeners(modelName + ':remove');
    }
  };
});
//# sourceMappingURL=socket.service.js.map

'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService($window) {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */

      safeCb: function safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
      },


      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse: function urlParse(url) {
        var a = document.createElement('a');
        a.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (a.host === '') {
          a.href = a.href;
        }

        return a;
      },


      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin: function isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = origins && [].concat(origins) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (o) {
          var hostnameCheck = url.hostname === o.hostname;
          var protocolCheck = url.protocol === o.protocol;
          // 2nd part of the special treatment for IE fix (see above):
          // This part is when using well-known ports 80 or 443 with IE,
          // when $window.location.port==='' instead of the real port number.
          // Probably the same cause as this IE bug: https://goo.gl/J9hRta
          var portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port === '443');
          return hostnameCheck && protocolCheck && portCheck;
        });
        return origins.length >= 1;
      }
    };

    return Util;
  }

  angular.module('smartSchoolRideApp.util').factory('Util', UtilService);
})();
//# sourceMappingURL=util.service.js.map

angular.module("smartSchoolRideApp").run(["$templateCache", function($templateCache) {$templateCache.put("components/footer/footer.html","<div class=\"container\"><p>Angular Fullstack v3.7.5 | <a href=\"https://twitter.com/tyhenkel\">@tyhenkel</a> | <a href=\"https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open\">Issues</a></p></div>");
$templateCache.put("components/modal/modal.html","<div class=\"modal-header\"><button ng-if=\"modal.dismissable\" type=\"button\" ng-click=\"$dismiss()\" class=\"close\">&times;</button><h4 ng-if=\"modal.title\" ng-bind=\"modal.title\" class=\"modal-title\"></h4></div><div class=\"modal-body\"><p ng-if=\"modal.text\" ng-bind=\"modal.text\"></p><div ng-if=\"modal.html\" ng-bind-html=\"modal.html\"></div></div><div class=\"modal-footer\"><button ng-repeat=\"button in modal.buttons\" ng-class=\"button.classes\" ng-click=\"button.click($event)\" ng-bind=\"button.text\" class=\"btn\"></button></div>");
$templateCache.put("components/navbar/navbar.html","<div ng-controller=\"NavbarController\" class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" ng-click=\"nav.isCollapsed = !nav.isCollapsed\" class=\"navbar-toggle\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">smart-school-ride</a></div><div id=\"navbar-main\" uib-collapse=\"nav.isCollapsed\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav\"><li ng-repeat=\"item in nav.menu\" ng-class=\"{active: nav.isActive(item.link)}\"><a ng-href=\"{{item.link}}\">{{item.title}}</a></li><li ng-show=\"nav.isAdmin()\" ng-class=\"{active: nav.isActive(&quot;/admin&quot;)}\"><a href=\"/admin\">Admin</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=\"nav.isLoggedIn()\" ng-class=\"{active: nav.isActive(&quot;/signup&quot;)}\"><a href=\"/signup\">Sign up</a></li><li ng-hide=\"nav.isLoggedIn()\" ng-class=\"{active: nav.isActive(&quot;/login&quot;)}\"><a href=\"/login\">Login</a></li><li ng-show=\"nav.isLoggedIn()\"><p class=\"navbar-text\">Hello {{ nav.getCurrentUser().name }}</p></li><li ng-show=\"nav.isLoggedIn()\" ng-class=\"{active: nav.isActive(&quot;/settings&quot;)}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=\"nav.isLoggedIn()\"><a href=\"/logout\">Logout</a></li></ul></div></div></div>");
$templateCache.put("app/admin/admin.html","<div class=\"container\"><p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p><ul class=\"list-group\"><li ng-repeat=\"user in admin.users\" class=\"list-group-item\"><strong>{{user.name}}</strong><br/><span class=\"text-muted\">{{user.email}}</span><a ng-click=\"admin.delete(user)\" class=\"trash\"><span class=\"glyphicon glyphicon-trash pull-right\"></span></a></li></ul></div>");
$templateCache.put("app/main/header.html","<div class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-top\"><div class=\"navbar-left\"><img src=\"/assets/app_logo.png\"/></div><div class=\"navbar-right\"><img src=\"/assets/app_logo.png\"/></div></div><!--div.navbar-header--><!--  button.navbar-toggle(type=\'button\', ng-click=\'vm.isCollapsed = !vm.isCollapsed\')--><!--    span.sr-only Toggle navigation--><!--    span.icon-bar--><!--    span.icon-bar--><!--    span.icon-bar--><!--  a.navbar-brand(href=\'/\') smart-school-ride--><!----><!--div#navbar-main.navbar-collapse.collapse(uib-collapse=\'vm.isCollapsed\')--><!--  ul.vm.navbar-nav--><!--    li(ng-repeat=\'item in vm.menu\', ng-class=\'{active: vm.isActive(item.link)}\')--><!--      a(ng-href=\'{{item.link}}\') {{item.title}}--><!----><!--    li(ng-show=\'vm.isAdmin()\', ng-class=\'{active: vm.isActive(\"/admin\")}\')--><!--      a(href=\'/admin\') Admin--><!----><!--  ul.vm.navbar-vm.navbar-right--><!--    li(ng-hide=\'vm.isLoggedIn()\', ng-class=\'{active: vm.isActive(\"/signup\")}\')--><!--      a(href=\'/signup\') Sign up--><!----><!--    li(ng-hide=\'vm.isLoggedIn()\', ng-class=\'{active: vm.isActive(\"/login\")}\')--><!--      a(href=\'/login\') Login--><!----><!--    li(ng-show=\'vm.isLoggedIn()\')--><!--      p.navbar-text Hello {{ vm.getCurrentUser().name }}--><!----><!--    li(ng-show=\'vm.isLoggedIn()\', ng-class=\'{active: vm.isActive(\"/settings\")}\')--><!--      a(href=\'/settings\')--><!--        span.glyphicon.glyphicon-cog--><!----><!--    li(ng-show=\'vm.isLoggedIn()\')--><!--      a(href=\'/logout\') Logout--></div></div>");
$templateCache.put("app/main/main.html","<div class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-top\"><div class=\"navbar-left\"><img src=\"/assets/app_logo.png\"/></div><div class=\"navbar-right\"><img src=\"/assets/app_logo.png\"/></div></div><!--div.navbar-header--><!--  button.navbar-toggle(type=\'button\', ng-click=\'vm.isCollapsed = !vm.isCollapsed\')--><!--    span.sr-only Toggle navigation--><!--    span.icon-bar--><!--    span.icon-bar--><!--    span.icon-bar--><!--  a.navbar-brand(href=\'/\') smart-school-ride--><!----><!--div#navbar-main.navbar-collapse.collapse(uib-collapse=\'vm.isCollapsed\')--><!--  ul.vm.navbar-nav--><!--    li(ng-repeat=\'item in vm.menu\', ng-class=\'{active: vm.isActive(item.link)}\')--><!--      a(ng-href=\'{{item.link}}\') {{item.title}}--><!----><!--    li(ng-show=\'vm.isAdmin()\', ng-class=\'{active: vm.isActive(\"/admin\")}\')--><!--      a(href=\'/admin\') Admin--><!----><!--  ul.vm.navbar-vm.navbar-right--><!--    li(ng-hide=\'vm.isLoggedIn()\', ng-class=\'{active: vm.isActive(\"/signup\")}\')--><!--      a(href=\'/signup\') Sign up--><!----><!--    li(ng-hide=\'vm.isLoggedIn()\', ng-class=\'{active: vm.isActive(\"/login\")}\')--><!--      a(href=\'/login\') Login--><!----><!--    li(ng-show=\'vm.isLoggedIn()\')--><!--      p.navbar-text Hello {{ vm.getCurrentUser().name }}--><!----><!--    li(ng-show=\'vm.isLoggedIn()\', ng-class=\'{active: vm.isActive(\"/settings\")}\')--><!--      a(href=\'/settings\')--><!--        span.glyphicon.glyphicon-cog--><!----><!--    li(ng-show=\'vm.isLoggedIn()\')--><!--      a(href=\'/logout\') Logout--></div></div><header id=\"banner\" class=\"hero-unit\"><div class=\"container\"><h1>\'Allo, \'Allo!</h1><p class=\"lead\">Kick-start your next web app with Angular Fullstack</p><img src=\"assets/images/yeoman-462ccecbb1.png\" alt=\"I\'m Yeoman\"/><li ng-show=\"vm.isLoggedIn()\"><a href=\"/logout\">Logout</a></li></div></header><div class=\"container\"><div class=\"row\"><div class=\"col-lg-12\"><h1 class=\"page-header\">Features:</h1><ul ng-repeat=\"thing in $ctrl.awesomeThings\" class=\"nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6\"><li><a href=\"#\" uib-tooltip=\"{{thing.info}}\">{{thing.name}}<button type=\"button\" ng-click=\"$ctrl.deleteThing(thing)\" class=\"close\">&times;</button></a></li></ul></div></div><form class=\"thing-form\"><label>Syncs in realtime across clients</label><p class=\"input-group\"><input type=\"text\" placeholder=\"Add a new thing here.\" ng-model=\"$ctrl.newThing\" class=\"form-control\"/><span class=\"input-group-btn\"><button type=\"submit\" ng-click=\"$ctrl.addThing()\" class=\"btn btn-primary\">Add New</button></span></p></form></div>");
$templateCache.put("app/account/login/forgot.html","<div ng-show=\"vm.isForgot\" ng-class=\"{fadeOut: !vm.isForgot}\" class=\"auth-forgot animated fadeInUp\"><div class=\"section-container\"><div layout=\"row\" layout-align=\"space-between\" class=\"section-header\"><span>Forgot Password</span><div ng-click=\"vm.showSignInDialog()\" class=\"hc-button hc-green hc-inverted hc-reset-button\">Sign In</div></div><form name=\"authForgotForm\" novalidate=\"\" ng-submit=\"authForgotForm.$valid &amp;&amp; vm.formForgot(authForgotForm)\" class=\"form-horizontal\"><div class=\"section-content\"><div class=\"row\"><div class=\"form-body col-md-offset-1 col-md-10 col-xs-offset-1 col-xs-10\"><div class=\"form-group\"><div ng-if=\"!vm.forgotEmailSent\" class=\"instructional-text\">Enter your e-mail address below to reset your password.</div><div ng-if=\"vm.forgotEmailSent\" class=\"instructional-text\">Please check your email for password reset instructions.</div></div><div ng-if=\"!vm.forgotEmailSent\" class=\"hc-form-row\"><input name=\"email\" type=\"email\" placeholder=\"Email address\" ng-model=\"vm.user.email\" required=\"required\" class=\"hc-form-control\"/></div></div></div></div><div ng-if=\"true\" layout=\"row\" layout-align=\"end\" class=\"section-footer\"><button type=\"submit\" class=\"hc-button hc-green hc-inverted hc-reset-button\">Reset</button></div></form></div></div>");
$templateCache.put("app/account/login/login.html","<div class=\"auth-page\"><div class=\"auth-wrapper\"><div class=\"ssr-logo-image\"><img src=\"/assets/app_logo.png\"/></div><div layout-align=\"space-between center\" class=\"top-right-container\"><div ng-if=\"vm.user.role === &quot;parent&quot;\" ng-click=\"vm.goSignupPage()\" class=\"hc-sign-link\">SIGN UP</div><div class=\"date-time\">{{ vm.date | date : \'MMMM dd, yyyy hh:mm a\' }}</div></div><div ng-show=\"!vm.isForgot\" ng-class=\"{fadeOut: true}\" class=\"auth-login animated fadeInUp\"><div class=\"section-container\"><form name=\"authLoginForm\" ng-submit=\"authLoginForm.$valid &amp;&amp; vm.formLogin(authLoginForm)\" novalidate=\"\" class=\"hc-form\"><div class=\"section-content\"><div ng-if=\"vm.user.role === &quot;admin&quot;\" class=\"welcome-label\">WELCOME TO THE SYSTEM<br/>ADMINISTRATION</div><div ng-if=\"vm.user.role === &quot;parent&quot;\" class=\"welcome-label\">WELCOME PARENTS & GUARDIANS</div><div class=\"hc-form-row\"><input name=\"email\" type=\"email\" placeholder=\"Email\" ng-model=\"vm.user.email\" required=\"required\" class=\"hc-form-control\"/><field-errors form=\"authLoginForm\" field-name=\"email\"></field-errors></div><div class=\"hc-form-row\"><input name=\"password\" type=\"password\" placeholder=\"Password\" ng-model=\"vm.user.password\" required=\"required\" class=\"hc-form-control\"/><field-errors form=\"authLoginForm\" field-name=\"password\"></field-errors></div><div layout=\"row\" class=\"hc-login-bottom-content\"><button type=\"submit\" class=\"hc-button hc-green hc-inverted hc-reset-button\">Login</button><div class=\"hc-forgot-content\"><div layout=\"row\" class=\"hc-forgot\"><div class=\"hc-label\">Forgot my&nbsp;</div><div ng-click=\"vm.showForgotPasswordDialog()\" class=\"hc-forgot-link\">Username or Password</div></div><div layout=\"row\" class=\"hc-remember\"><input name=\"remember\" id=\"remember\" type=\"checkbox\" ng-model=\"vm.user.remember\"/><label for=\"remember\" class=\"instructional-text\">&nbsp;Keep me updated on new features</label></div></div></div></div></form></div></div><div ng-show=\"vm.isForgot\" ng-class=\"{fadeOut: !vm.isForgot}\" class=\"auth-forgot animated fadeInUp\"><div class=\"section-container\"><div layout=\"row\" layout-align=\"space-between\" class=\"section-header\"><span>Forgot Password</span><div ng-click=\"vm.showSignInDialog()\" class=\"hc-button hc-green hc-inverted hc-reset-button\">Sign In</div></div><form name=\"authForgotForm\" novalidate=\"\" ng-submit=\"authForgotForm.$valid &amp;&amp; vm.formForgot(authForgotForm)\" class=\"form-horizontal\"><div class=\"section-content\"><div class=\"row\"><div class=\"form-body col-md-offset-1 col-md-10 col-xs-offset-1 col-xs-10\"><div class=\"form-group\"><div ng-if=\"!vm.forgotEmailSent\" class=\"instructional-text\">Enter your e-mail address below to reset your password.</div><div ng-if=\"vm.forgotEmailSent\" class=\"instructional-text\">Please check your email for password reset instructions.</div></div><div ng-if=\"!vm.forgotEmailSent\" class=\"hc-form-row\"><input name=\"email\" type=\"email\" placeholder=\"Email address\" ng-model=\"vm.user.email\" required=\"required\" class=\"hc-form-control\"/></div></div></div></div><div ng-if=\"true\" layout=\"row\" layout-align=\"end\" class=\"section-footer\"><button type=\"submit\" class=\"hc-button hc-green hc-inverted hc-reset-button\">Reset</button></div></form></div></div></div></div>");
$templateCache.put("app/account/settings/settings.html","<div class=\"container\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Change Password</h1></div><div class=\"col-sm-12\"><form name=\"form\" ng-submit=\"vm.changePassword(form)\" novalidate=\"\" class=\"form\"><div class=\"form-group\"><label>Current Password</label><input type=\"password\" name=\"password\" ng-model=\"vm.user.oldPassword\" mongoose-error=\"\" class=\"form-control\"/><p ng-show=\"form.password.$error.mongoose\" class=\"help-block\">{{ vm.errors.other }}</p></div><div class=\"form-group\"><label>New Password</label><input type=\"password\" name=\"newPassword\" ng-model=\"vm.user.newPassword\" ng-minlength=\"3\" required=\"\" class=\"form-control\"/><p ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) &amp;&amp; (form.newPassword.$dirty || vm.submitted)\" class=\"help-block\">Password must be at least 3 characters.</p></div><div class=\"form-group\"><label>Confirm New Password</label><input type=\"password\" name=\"confirmPassword\" ng-model=\"vm.user.confirmPassword\" match=\"vm.user.newPassword\" ng-minlength=\"3\" required=\"\" class=\"form-control\"/><p ng-show=\"fvm.orm.confirmPassword.$error.match &amp;&amp; vm.submitted\" class=\"help-block\">Passwords must match.</p></div><p class=\"help-block\"> {{ vm.message }}</p><button type=\"submit\" class=\"btn btn-lg btn-primary\">Save changes</button></form></div></div></div>");
$templateCache.put("app/account/signup/signup.html","<div class=\"auth-page\"><div class=\"auth-wrapper\"><div class=\"ssr-logo-image\"><img src=\"/assets/app_logo.png\"/></div><div layout-align=\"space-between center\" class=\"top-right-container\"><div ng-click=\"vm.goSignInPage()\" class=\"hc-sign-link\">LOG IN</div><div class=\"date-time\">{{ vm.date | date : \'MMMM dd, yyyy hh:mm a\' }}</div></div><div class=\"title-bar\">Sign Up</div><div ng-class=\"{fadeOut: true}\" class=\"auth-signup animated fadeInUp\"><div class=\"section-container\"><form name=\"authLoginForm\" ng-submit=\"authLoginForm.$valid &amp;&amp; vm.register(authLoginForm)\" novalidate=\"\" class=\"hc-form\"><div class=\"section-content\"><div layout=\"row\" class=\"hc-input-box\"><div class=\"hc-inuput-box-left\"><label class=\"hc-input-label\">Username</label><input name=\"text\" type=\"text\" placeholder=\"Username\" ng-model=\"vm.user.name\" required=\"required\" class=\"hc-form-control\"/></div><div class=\"hc-inuput-box-right\"><label class=\"hc-input-label\">Email</label><input name=\"email\" type=\"email\" placeholder=\"Email\" ng-model=\"vm.user.email\" required=\"required\" class=\"hc-form-control\"/></div></div><div layout=\"row\" class=\"hc-input-box\"><div class=\"hc-inuput-box-left\"><label class=\"hc-input-label\">First Name</label><input name=\"text\" type=\"text\" placeholder=\"First Name\" ng-model=\"vm.user.firstname\" required=\"required\" class=\"hc-form-control\"/></div><div class=\"hc-inuput-box-right\"><label class=\"hc-input-label\">Last Name</label><input name=\"text\" type=\"text\" placeholder=\"Last Name\" ng-model=\"vm.user.lastname\" required=\"required\" class=\"hc-form-control\"/></div></div><div layout=\"row\" class=\"hc-input-box\"><div class=\"hc-inuput-box-left\"><label class=\"hc-input-label\">Password</label><input name=\"password\" type=\"password\" placeholder=\"Password\" ng-model=\"vm.user.password\" required=\"required\" class=\"hc-form-control\"/></div><div class=\"hc-inuput-box-right\"><label class=\"hc-input-label\">Confirm Password</label><input name=\"password\" type=\"password\" placeholder=\"Confirm Password\" ng-model=\"vm.user.confirmpassword\" required=\"required\" class=\"hc-form-control\"/></div></div><div layout=\"row\" class=\"hc-login-bottom-content\"><div layout=\"row\" class=\"hc-remember\"><input name=\"termsofservice\" id=\"termsofservice\" type=\"checkbox\" ng-model=\"vm.user.termsofserivce\" required=\"required\"/><label layout=\"row\" for=\"termsofservice\"><div class=\"hc-agree-label\">&nbsp;I agree to the&nbsp;</div><div ng-click=\"\" class=\"hc-forgot-link\">Terms of Service</div></label></div><div layout=\"row\" class=\"hc-remember\"><input name=\"remember\" id=\"remember\" type=\"checkbox\" ng-model=\"vm.user.remember\"/><label for=\"remember\" class=\"instructional-text\">&nbsp;Keep me updated on new features</label></div></div><button type=\"submit\" class=\"hc-button hc-small signup-button\">SIGN UP</button></div></form></div></div></div></div>");}]);