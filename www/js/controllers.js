angular.module('starter.controllers', [])
/*
* Controller : AppCtrl
*
*/

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
	if ($scope.loginData.username == 'admin' && $scope.loginData.password == 'admin')  
    <!---->console.log('Doing login', $scope.loginData);
	
	$timeout(function() {
		/*var result = { referer:'jimbob', param2:37, etc:'bluebell' };
		$state.go('app.vouchers', result);	*/
		$state.go('app.vouchers', { 'index': 123, 'anotherKey': 'This is a test' });
      $scope.closeLogin();
	  
    }, 1500);

	
	else{
		alert("senha e email incorretos");
	}
/*    $timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
	
  };
  
  
$scope.logout = function() {
	$state.go('welcome');
};
  
  
})


/*
* Controller : vouchersCtrl
*
*/
.controller('vouchersCtrl', function($scope, $stateParams) {

	var index = $stateParams[0];
    var anotherKey = $stateParams[1];

  $scope.vouchers = [
    { title: 'Ativo', id: 1, cod: 345 },
    { title: 'N Ativo', id: 2 },
  ];
})


/*
* Controller : voucherCtrl
*
*/
.controller('voucherCtrl', function($scope, $stateParams) {
   
});
