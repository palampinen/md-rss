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
      findFeed:function(url,cb) {
        var RSS_SUGGESTIONS = ['','feed','rss','feeds/posts/default','feeds/atom'],
            validRSS = false,
            tmpurl = '',
            i = 0;

        while(RSS_SUGGESTIONS.length>i&&!validRSS) 
        {


          tmpurl = (url.charAt(url.length-1) == '/' || RSS_SUGGESTIONS[i] == '') ? url+RSS_SUGGESTIONS[i++] : url+'/'+RSS_SUGGESTIONS[i++]
          //if(url.indexOf('/'+RSS_SUGGESTIONS[i]) < 0)
            $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=0&callback=JSON_CALLBACK&q=' + encodeURIComponent(tmpurl)).then(function(feed){
              if(feed.data.responseStatus == 200 && !validRSS) {
                 validRSS  = true;
                 cb(feed);
              }
            })
          
        }
       
      },
      parseFeed : function(url,num){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+num+'&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }
    }


  });
