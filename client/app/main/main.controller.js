'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, $location, Auth, appConfig) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.date = new Date();

      this.$location = $location;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      this.tabs = appConfig.mainTabs;
      this.activeTab = appConfig.mainTabs[0];

      this.lat = 42.991508;
      this.lon = 101.509726;

      this.buses = [
        {title: "Bus name1"},
        {title: "Bus name2"},
        {title: "Bus name3"},
        {title: "Bus name4"}
      ];

      this.selected = {};
      this.selected.bus = "Bus name1";

      //$scope.$on('$destroy', function() {
      //  socket.unsyncUpdates('thing');
      //});
    }

    //$onInit() {
    //  this.$http.get('/api/things')
    //    .then(response => {
    //      this.awesomeThings = response.data;
    //      this.socket.syncUpdates('thing', this.awesomeThings);
    //    });
    //}
    //
    //addThing() {
    //  if (this.newThing) {
    //    this.$http.post('/api/things', {
    //      name: this.newThing
    //    });
    //    this.newThing = '';
    //  }
    //}
    //
    //deleteThing(thing) {
    //  this.$http.delete('/api/things/' + thing._id);
    //}

    isActive(route) {
      return route === this.$location.path();
    }

    onLogout() {
      this.$location.path('/logout');
    }
  }

  angular.module('smartSchoolRideApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'vm'
    });
})();
