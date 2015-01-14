'use strict';

/**
 * @ngdoc function
 * @name materialogApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the materialogApp
 */
angular.module('materialogApp')
  .controller('MenuCtrl', function ($rootScope,$scope,$localStorage,$mdSidenav) {

    if(!$localStorage.blogs) $localStorage.blogs = [];
    $scope.blogs = $localStorage.blogs || [];
    console.log($scope.blogs); 

    $scope.blogFunctions = {
      add: function(){
         
        $mdSidenav('left').close()
          .then(function(){
            document.getElementById('addBlog').getElementsByTagName("input")[0].focus();;
          });
      },
      select: function(id){
        $mdSidenav('left').close();
        $localStorage.currentBlog=id;
        $rootScope.url = $localStorage.blogs[id].url;
      },
      remove: function(id) {
        $localStorage.blogs.splice(id,1)
      }
    }

    $scope.close = function() {

    }


    $scope.active = function(url) {
      if(!url) return false;
      return $rootScope.url == url
    }


  });
