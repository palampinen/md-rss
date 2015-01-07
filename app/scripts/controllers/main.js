'use strict';

/**
 * @ngdoc function
 * @name materialogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the materialogApp
 */
angular.module('materialogApp')
  .controller('MainCtrl', function ($scope,$timeout,$localStorage, Blog) {

    $scope.url = $localStorage.url;

/*
* Watch url variable
* 
* Call function if not acted in 2 seconds
*/
    var promise;
    $scope.$watch('url',function(oldVal,newVal){
      $timeout.cancel(promise)
      promise = $timeout(function(){ getFeed()},2000)
    })


    var getFeed = function() {
      $scope. status = false;
      $localStorage.url = $scope.url;
      console.log('getting feed', $localStorage.url)
      if($localStorage.url)
      Blog.parseFeed( $localStorage.url, 30).then(function(feed) {
        console.log(feed)
        $scope.status = feed.data.responseStatus == 200;

        if(!feed.data ||!feed.data.responseData || !feed.data.responseData.feed) {
          $scope.feed = {}
          return;
        }
        $scope.feed = feed.data.responseData.feed;

        //format dates
        $scope.feed.entries.map( function(a){
          return a.publishedDate = moment(a.publishedDate).format('DD.MM.YYYY HH:mm');
        });
      })

    }

  });
