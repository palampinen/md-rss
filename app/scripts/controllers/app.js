'use strict';

/**
 * @ngdoc function
 * @name materialogApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the materialogApp
 */
angular.module('materialogApp')
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdBottomSheet, $log) {
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle()
      .then(function(){
        $log.debug("toggle left is done");
      });
    };


  $scope.showBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'views/bottom-sheet.html',
      controller: 'BottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
     
    });
  };


  })
  .controller('BottomSheetCtrl', function($scope, $mdBottomSheet,$location,$localStorage) {
  
    //window.location.href
    //document.URL
    //var URL = window.location.href.replace('#/','').replace('#','')
    var root = document.URL.split('/#');
    root = root[0];
    $scope.URL = root + '/#/url?urls=';

    $localStorage.blogs.forEach(function(item,i) {
//$scope.URL+=encodeURIComponent(item.url);
      $scope.URL+=item.url;
      if(i!=$localStorage.blogs.length-1)
        $scope.URL+=',';
    })



  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };

})
