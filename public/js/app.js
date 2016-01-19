!function(){"use strict";angular.module("app",["app.controllers","app.filters","app.services","app.directives","app.routes","app.config","partialsModule"]),angular.module("app.routes",[]),angular.module("app.controllers",["ui.router","ngMaterial","ngStorage","restangular","angular-loading-bar","satellizer"]),angular.module("app.filters",[]),angular.module("app.services",[]),angular.module("app.directives",[]),angular.module("app.config",[])}(),function(){"use strict";angular.module("app.routes").config(["$stateProvider","$urlRouterProvider","$authProvider",function(t,e,r){var n=function(t){return"./views/app/"+t+"/"+t+".html"};e.otherwise("/"),t.state("app",{"abstract":!0,views:{header:{templateUrl:n("header")},footer:{templateUrl:n("footer")},main:{}}}).state("app.landing",{url:"/",data:{},views:{"main@":{templateUrl:n("landing")}}}).state("app.login",{url:"/login",data:{},views:{"main@":{templateUrl:n("login")}}}).state("app.register",{url:"/register",data:{},views:{"main@":{templateUrl:n("register")}}}).state("app.loggedin",{url:"/protected",data:{},views:{"main@":{templateUrl:n("protected")}}})}])}(),function(){"use strict";angular.module("app.config").config(["cfpLoadingBarProvider",function(t){t.includeSpinner=!1}])}(),function(){"use strict";angular.module("app.config").config(["$authProvider",function(t){t.storageType="localStorage",t.tokenName="token",t.httpInterceptor=!1,t.facebook({clientId:"Facebook App ID"}),t.google({clientId:"Google Client ID"}),t.github({clientId:"GitHub Client ID"}),t.linkedin({clientId:"LinkedIn Client ID"}),t.instagram({clientId:"Instagram Client ID"}),t.yahoo({clientId:"Yahoo Client ID / Consumer Key"}),t.live({clientId:"Microsoft Client ID"}),t.twitch({clientId:"Twitch Client ID"}),t.bitbucket({clientId:"Bitbucket Client ID"}),t.oauth2({name:"foursquare",url:"/auth/foursquare",clientId:"Foursquare Client ID",redirectUri:window.location.origin,authorizationEndpoint:"https://foursquare.com/oauth2/authenticate"})}])}(),function(){"use strict";angular.module("app.config").config(["$mdThemingProvider",function(t){t.theme("default").primaryPalette("indigo").accentPalette("grey").warnPalette("red")}])}(),function(){"use strict";angular.module("app.filters").filter("capitalize",function(){return function(t){return t?t.replace(/([^\W_]+[^\s-]*) */g,function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()}):""}})}(),function(){"use strict";angular.module("app.filters").filter("humanReadable",function(){return function(t){if(!t)return"";for(var e=t.split("_"),r=0;r<e.length;r++)e[r]=e[r].charAt(0).toUpperCase()+e[r].slice(1);return e.join(" ")}})}(),function(){"use strict";angular.module("app.filters").filter("truncateCharacters",function(){return function(t,e,r){if(isNaN(e))return t;if(0>=e)return"";if(t&&t.length>e){if(t=t.substring(0,e),r)for(;" "===t.charAt(t.length-1);)t=t.substr(0,t.length-1);else{var n=t.lastIndexOf(" ");-1!==n&&(t=t.substr(0,n))}return t+"..."}return t}})}(),function(){"use strict";angular.module("app.filters").filter("truncateWords",function(){return function(t,e){if(isNaN(e))return t;if(0>=e)return"";if(t){var r=t.split(/\s+/);r.length>e&&(t=r.slice(0,e).join(" ")+"...")}return t}})}(),function(){"use strict";angular.module("app.filters").filter("trustHtml",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}])}(),function(){"use strict";angular.module("app.filters").filter("ucfirst",function(){return function(t){return t?t.substring(0,1).toUpperCase()+t.substring(1):null}})}(),function(){"use strict";angular.module("app.services").factory("API",["Restangular","ToastService","$auth",function(t,e,r){var n={"Content-Type":"application/json",Accept:"application/x.laravel.v1+json"};return t.withConfig(function(t){t.setBaseUrl("/api/").setDefaultHeaders(n).setErrorInterceptor(function(t){if(422===t.status)for(var r in t.data.errors)return e.error(t.data.errors[r][0])}).addFullRequestInterceptor(function(t,e,n,o,i){r.getToken()&&(i.Authorization="Bearer "+r.getToken())})})}])}(),function(){"use strict";angular.module("app.services").factory("DialogService",["$mdDialog",function(t){return{fromTemplate:function(e,r){var n={templateUrl:"./views/dialogs/"+e+"/"+e+".html"};return r&&(n.scope=r.$new()),t.show(n)},hide:function(){return t.hide()},alert:function(e,r){t.show(t.alert().title(e).content(r).ok("Ok"))},confirm:function(e,r){return t.show(t.confirm().title(e).content(r).ok("Ok").cancel("Cancel"))}}}])}(),function(){"use strict";angular.module("app.services").factory("ToastService",["$mdToast",function(t){var e=6e3,r="top right",n="OK";return{show:function(o){return o?t.show(t.simple().content(o).position(r).action(n).hideDelay(e)):!1},error:function(o){return o?t.show(t.simple().content(o).position(r).theme("warn").action(n).hideDelay(e)):!1}}}])}(),function(){"use strict";function t(){}angular.module("app.controllers").controller("FooterController",t)}(),function(){"use strict";function t(){}angular.module("app.controllers").controller("HeaderController",t)}(),function(){"use strict";function t(){var t=this;t.laravel_description="Response macros integrated with your Angular app",t.angular_description="Query your API without worrying about validations",t.iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)}angular.module("app.controllers").controller("LandingController",t)}(),function(){"use strict";function t(){}angular.module("app.controllers").controller("LoginController",t)}(),function(){"use strict";function t(t){var e=this;t.one("sample/protected").get().then(function(t){e.loggedin=angular.fromJson(t.data)})}angular.module("app.controllers").controller("ProtectedController",t),t.$inject=["API"]}(),function(){"use strict";function t(){}angular.module("app.controllers").controller("RegisterController",t)}(),function(){"use strict";function t(){var t={restrict:"E",templateUrl:"./views/directives/login-form/login-form.html",controller:"LoginFormController",controllerAs:"vm",scope:{},bindToController:!0};return t}angular.module("app.directives").directive("loginForm",t)}(),function(){"use strict";function t(t,e,r,n){var o=this;o.authenticate=function(t){e.authenticate(t)},o.login=function(){var i={email:o.email,password:o.password};t.info("Logging in..."),e.login(i).then(function(t){n.show("Login successful"),r.go("app.loggedin")})["catch"](function(e){t.info("Error Response: "+angular.toJson(e.data)),n.error(e.data.errors)})}}angular.module("app.controllers").controller("LoginFormController",t),t.$inject=["$log","$auth","$state","ToastService"]}(),function(){"use strict";function t(){var t={restrict:"E",templateUrl:"./views/directives/register-form/register-form.html",controller:"RegisterFormController",controllerAs:"vm",scope:{},bindToController:!0};return t}angular.module("app.directives").directive("registerForm",t)}(),function(){"use strict";function t(){}angular.module("app.controllers").controller("RegisterFormController",t)}();