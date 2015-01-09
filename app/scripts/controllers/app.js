'use strict';

/**
 * @ngdoc function
 * @name materialogApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the materialogApp
 */
angular.module('materialogApp')
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle()
      .then(function(){
        $log.debug("toggle left is done");
      });
    };
  });
