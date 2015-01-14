'use strict';

/**
 * @ngdoc function
 * @name materialogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the materialogApp
 */
angular.module('materialogApp')
  .controller('MainCtrl', function ($rootScope, $scope,$timeout,$location,$localStorage,Blog) {

  if(!$localStorage.blogs) $localStorage.blogs = [];
  $scope.current = $localStorage.currentBlog&&parseInt($localStorage.currentBlog) ? $localStorage.currentBlog : 0;
  $scope.url = $localStorage.blogs&&$localStorage.blogs.length && $localStorage.blogs[$scope.current] && $localStorage.blogs[$scope.current].url ? $localStorage.blogs[$scope.current].url : '';



    $scope.$watch(
      function() {return $rootScope.url},
      function(newVal,oldVal){
        $scope.url = newVal;
    })

  $scope.clear = function(){
    $scope.url = '';
  }

/*
* Watch url variable
* 
* Call function if not acted in 2 seconds
*/
    var promise;
    $scope.$watch('url',function(newVal,oldVal){
      if(newVal) 
        $scope.loading = true;
      
      // clear feed
        $scope.feed = {};

      $timeout.cancel(promise)
      promise = $timeout(function(){ getFeed(newVal)},2000)
    })

    $scope.loading = false;

     var validateURL = function(url) {
      if(!url)
        return false;

      if(url.indexOf('http') < 0)
        url = 'http://'+url;

      if(url.indexOf('.') < 0 )
        return false;
      return url
    }

    var getFeed = function(url) {
      $scope.loading = true;


      url=validateURL(url)

      if(!url){
        $scope.status = false;
        $scope.loading = false;
        return;
      }

      // find feed url
      Blog.findFeed(url, function(feed) {
        var feedUrl = feed.data.responseData.feed.feedUrl

        // set feed to list
                // Store blog
        if(!$localStorage.blogs) $localStorage.blogs = [];

        var duplicate = _.find($localStorage.blogs, function(blog){ return blog.url==feedUrl });


        if(!duplicate)
        $localStorage.blogs.push({
          url:feed.data.responseData.feed.feedUrl,
          link:feed.data.responseData.feed.link,
          title:feed.data.responseData.feed.title
        });

      console.log(feed.data.responseData)

        // get feed
        Blog.parseFeed( feedUrl, 30).then(function(feed){
          setFeed(feed,url)
        })
      }); 

    }

    var setFeed = function(feed,url) {
        console.log(feed)
        $scope.status = feed.data.responseStatus == 200;
        $scope.loading = false;
        
        if(!feed.data ||!feed.data.responseData || !feed.data.responseData.feed) {
          $scope.feed = {}
          return;
        }
        

        $scope.feed = feed.data.responseData.feed;


        // Format dates
        $scope.feed.entries.map( function(a){
          return a.publishedDate = moment(a.publishedDate).format('DD.MM.YYYY HH:mm');
        });
      }
    

// Get urls from parameter on load

    //var urls = gup('url').split(',');
    if( $location.search().urls ) {
      var urls = $location.search().urls.split(',');
      
      _.map(urls,function(url,i){
        if(url){
          $timeout(function() {
            getFeed(url)
          },10);
        }

        if(i+1 >= urls.length)
          $timeout(function() {
            delete $location.$$search.urls;
            $location.$$compose();
            //$location.path('/',false)
          },1000);

      });

    }



  });
