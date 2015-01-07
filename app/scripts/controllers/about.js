'use strict';

/**
 * @ngdoc function
 * @name materialogApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the materialogApp
 */
angular.module('materialogApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
