"use strict";function gup(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b="[\\?&]"+a+"=([^&#]*)",c=new RegExp(b),d=c.exec(window.location.href);return null==d?"":d[1]}angular.module("materialogApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","ngMaterial"]).config(["$locationProvider","$routeProvider","$mdThemingProvider",function(a,b,c){b.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/url",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"}),c.theme("default").primaryColor("pink").accentColor("indigo")}]).run(["$rootScope",function(){}]),angular.module("materialogApp").controller("MainCtrl",["$rootScope","$scope","$timeout","$location","$localStorage","Blog",function(a,b,c,d,e,f){e.blogs||(e.blogs=[]),b.current=e.currentBlog&&parseInt(e.currentBlog)?e.currentBlog:0,b.url=e.blogs&&e.blogs.length&&e.blogs[b.current]&&e.blogs[b.current].url?e.blogs[b.current].url:"",b.$watch(function(){return a.url},function(a){b.url=a}),b.clear=function(){b.url=""};var g;b.$watch("url",function(a){a&&(b.loading=!0),b.feed={},c.cancel(g),g=c(function(){i(a)},2e3)}),b.loading=!1;var h=function(a){return a?(a.indexOf("http")<0&&(a="http://"+a),a.indexOf(".")<0?!1:a):!1},i=function(a){return b.loading=!0,(a=h(a))?void f.findFeed(a,function(b){var c=b.data.responseData.feed.feedUrl;e.blogs||(e.blogs=[]);var d=_.find(e.blogs,function(a){return a.url==c});d||e.blogs.push({url:b.data.responseData.feed.feedUrl,link:b.data.responseData.feed.link,title:b.data.responseData.feed.title}),console.log(b.data.responseData),f.parseFeed(c,30).then(function(b){j(b,a)})}):(b.status=!1,void(b.loading=!1))},j=function(a){return console.log(a),b.status=200==a.data.responseStatus,b.loading=!1,a.data&&a.data.responseData&&a.data.responseData.feed?(b.feed=a.data.responseData.feed,void b.feed.entries.map(function(a){return a.publishedDate=moment(a.publishedDate).format("DD.MM.YYYY HH:mm")})):void(b.feed={})};if(d.search().urls){var k=d.search().urls.split(",");_.map(k,function(a,b){a&&c(function(){i(a)},10),b+1>=k.length&&c(function(){delete d.$$search.urls,d.$$compose()},1e3)})}}]),angular.module("materialogApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("materialogApp").factory("Blog",["$http",function(a){return{findFeed:function(b,c){for(var d=["","feed","rss","feeds/posts/default","feeds/atom"],e=!1,f="",g=0;d.length>g&&!e;)f="/"==b.charAt(b.length-1)||""==d[g]?b+d[g++]:b+"/"+d[g++],a.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=0&callback=JSON_CALLBACK&q="+encodeURIComponent(f)).then(function(a){200!=a.data.responseStatus||e||(e=!0,c(a))})},parseFeed:function(b,c){return a.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="+c+"&callback=JSON_CALLBACK&q="+encodeURIComponent(b))}}}]),angular.module("materialogApp").controller("MenuCtrl",["$rootScope","$scope","$localStorage","$mdSidenav",function(a,b,c,d){c.blogs||(c.blogs=[]),b.blogs=c.blogs||[],console.log(b.blogs),b.blogFunctions={add:function(){d("left").close().then(function(){document.getElementById("addBlog").getElementsByTagName("input")[0].focus()})},select:function(b){d("left").close(),c.currentBlog=b,a.url=c.blogs[b].url},remove:function(a){c.blogs.splice(a,1)}},b.close=function(){},b.active=function(b){return b?a.url==b:!1}}]),angular.module("materialogApp").controller("AppCtrl",["$scope","$timeout","$mdSidenav","$mdBottomSheet","$log",function(a,b,c,d,e){a.toggleLeft=function(){c("left").toggle().then(function(){e.debug("toggle left is done")})},a.showBottomSheet=function(b){a.alert="",d.show({templateUrl:"views/bottom-sheet.html",controller:"BottomSheetCtrl",targetEvent:b}).then(function(){})}}]).controller("BottomSheetCtrl",["$scope","$mdBottomSheet","$location","$localStorage",function(a,b,c,d){var e=location.protocol+"//"+location.host;a.URL=e+"/#/url?urls=",d.blogs.forEach(function(b,c){a.URL+=b.url,c!=d.blogs.length-1&&(a.URL+=",")}),a.listItemClick=function(c){var d=a.items[c];b.hide(d)}}]);