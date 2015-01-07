'use strict';

/**
 * @ngdoc service
 * @name materialogApp.Blog
 * @description
 * # Blog
 * Service in the materialogApp.
 */
angular.module('materialogApp')
  .factory('Blog', function ($http) {
    

    return {
      parseFeed : function(url,num){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+num+'&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }
    }


  });
