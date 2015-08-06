/*
* Modulo Criado : starter;
* include module: ionic
*include module : starter.controllers
* include module : starter.welcomeController
*/
var app = angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.deploy', 'starter.controllers', 'starter.welcomeController', 'ngMockE2E'])

.run(function($httpBackend){
  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.run(function($httpBackend){
  $httpBackend.whenGET('http://localhost:8100/valid')
        .respond({message: 'This is my valid response!'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
        .respond(403, {message: "Not Authorized"});
 
  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
 })
 
.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'ad0347df',
    // The public API key all services will use for this app
    api_key: 'cf884265ec1abeac6cca906ead5e4847483a2bc7b7d3bc02'
  });
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


.state('app', {
	url: "/app",
	templateUrl: "templates/menu.html",
	controller: 'WelcomeCtrl',
	controllerAs: ''
})
.state('welcome', {
	url: "/welcome",
	templateUrl: "templates/welcome.html",
	controller: 'WelcomeCtrl',
	controllerAs: ''
})
.state('app.vouchers', {
  url: "/vouchers",
  views: {
	'menuContent': {
	  templateUrl: "templates/vouchers.html",
	  controller: 'vouchersCtrl'
	}
  }
})
.state('app.single', {
url: "/vouchers/:voucherId",
views: {
  'menuContent': {
	templateUrl: "templates/voucher.html",
	controller: 'voucherCtrl'
  }
}
});
  //default caso contrario use a rota X
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("app.vouchers");
  });
})

.run(function($ionicPlatform, $rootScope, $location, $state) {

 $ionicPlatform.ready(function() {
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	  
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  	
  
})
