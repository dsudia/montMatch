(function() {

  'use strict';

  angular.module('montMatch', ['ui.router', 'angular-refills']);

  angular.module('montMatch').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      });
  });
})();