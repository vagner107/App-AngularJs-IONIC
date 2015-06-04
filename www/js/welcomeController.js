angular.module('starter.welcomeController', [])
/*
* Controller : AppCtrl
*
*/

.controller('WelcomeCtrl', function($scope, $ionicModal, $timeout, $state) {

//********************************************* LOGIN  ***********************************************// 
  $scope.loginData = {};

  // Cria modal 
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // fechar modal 
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // abrir modal
  $scope.login = function() {
    $scope.modal.show();
  };

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
  
  
//********************************************* CADASTRO  ***********************************************// 
  $scope.cadastroData = {};


  $ionicModal.fromTemplateUrl('templates/cadastro.html', {
    scope: $scope
  }).then(function(modal1) {
    $scope.modal1 = modal1;
  });

  
  $scope.closeCadastro = function() {
    $scope.modal1.hide();
  };

 
  $scope.cadastro = function() {
    $scope.modal1.show();
  };

  
  $scope.doCadastro = function() {
	if ($scope.cadastroData.username == 'admin' && $scope.cadastroData.password == 'admin')  
    <!---->console.log('Doing login', $scope.loginData);
	
	$timeout(function() {
		/*var result = { referer:'jimbob', param2:37, etc:'bluebell' };
		$state.go('app.vouchers', result);	*/
		$state.go('app.vouchers', { 'index': 123, 'anotherKey': 'This is a test' });
      $scope.closeCadastro();
	  
    }, 1500);

	
	else{
		alert("dados incorretos");
	}

  };
  
//********************************************* RECUPERAR SENHA  ***********************************************//

 $scope.senhaData = {};

  // Cria modal 
  $ionicModal.fromTemplateUrl('templates/recuperarSenha.html', {
    scope: $scope
  }).then(function(modal2) {
    $scope.modal2 = modal2;
  });

  // fechar modal 
  $scope.closeSenha = function() {
    $scope.modal2.hide();
  };

  // abrir modal
  $scope.senhaRecupera = function() {
    $scope.modal2.show();
  };

  $scope.doSenha = function() {
	if ($scope.senhaData.username == 'admin' && $scope.senhaData.password == 'admin')  
    <!---->console.log('Doing login', $scope.loginData);
	
	$timeout(function() {
		/*var result = { referer:'jimbob', param2:37, etc:'bluebell' };
		$state.go('app.vouchers', result);	*/
		$state.go('app.vouchers', { 'index': 123, 'anotherKey': 'This is a test' });
      $scope.closeSenha();
	  
    }, 1500);

	
	else{
		alert("email Enviado com sucesso");
	}
/*    $timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
	
  };
  
  
$scope.logout = function() {
	$state.go('welcome');
};
  
  
})
