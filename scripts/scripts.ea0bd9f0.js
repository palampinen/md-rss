"use strict";angular.module("materialogApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","ngMaterial"]).config(["$locationProvider","$routeProvider",function(a,b){a.html5Mode(!0),b.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("materialogApp").controller("MainCtrl",["$scope","$timeout","$localStorage","Blog",function(a,b,c,d){a.url=c.url;var e;a.$watch("url",function(){b.cancel(e),e=b(function(){f()},2e3)});var f=function(){a.status=!1,c.url=a.url,console.log("getting feed",c.url),c.url&&d.parseFeed(c.url,30).then(function(b){return console.log(b),a.status=200==b.data.responseStatus,b.data&&b.data.responseData&&b.data.responseData.feed?(a.feed=b.data.responseData.feed,void a.feed.entries.map(function(a){return a.publishedDate=moment(a.publishedDate).format("DD.MM.YYYY HH:mm")})):void(a.feed={})})}}]),angular.module("materialogApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("materialogApp").factory("Blog",["$http",function(a){return{parseFeed:function(b,c){return a.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="+c+"&callback=JSON_CALLBACK&q="+encodeURIComponent(b))}}}]);