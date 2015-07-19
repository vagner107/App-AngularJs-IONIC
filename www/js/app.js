/*
* Modulo Criado : starter;
* include module: ionic
*include module : starter.controllers
* include module : starter.welcomeController
*/
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.deploy', 'starter.controllers', 'starter.welcomeController'])

.run(function($ionicPlatform) {

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


.state('welcome', {
	url: "/welcome",
	templateUrl: "templates/welcome.html",
	controller: 'WelcomeCtrl',
	controllerAs: ''
})

.state('app', {
	url: "/app",
	abstract: true,
	templateUrl: "templates/menu.html",
	controller: 'AppCtrl'
})

 
.state('app.search', {
url: "/search",
views: {
  'menuContent': {
	templateUrl: "templates/search.html"
  }
}
})

.state('browse', {
url: "/browse",
views: {
  'menuContent': {
	templateUrl: "templates/browse.html"
  }
}
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
  $urlRouterProvider.otherwise('/welcome');
});
