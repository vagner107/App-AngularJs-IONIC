/*
* Modulo Criado : starter.controllers;
* include module: ionic
*/
angular.module('starter.controllers', ['ionic'])
/***********************************************************************************
* Controller : AppCtrl
* $ionicModal: Serviço para abilitar modal IONIC
* $timeout :  Serviço com metodos com temporizadores
* $state : Serviço utilizado na app para direcionar para paginas
***********************************************************************************/
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  
	$scope.logout = function() {
		$state.go('welcome');
	};
  
})
/***********************************************************************************
* Controller : vouchersCtrl
* $stateParams: Serviço utilizado para redirecionar parametros pela URL como um php
***********************************************************************************/
.controller('vouchersCtrl', function($scope, $stateParams) {

  $scope.vouchers = [
    { title: 'Voucher Ativo', status: 'A'},
    { title: 'Voucher Utilizado', status: 'U'},
  ];
})
/***********************************************************************************
* Controller : voucherCtrl
* $stateParams: Serviço utilizado para redirecionar parametros pela URL como um php
***********************************************************************************/
.controller('voucherCtrl', function($scope, $stateParams, $http, statesService) {
		
	if($stateParams.voucherId == 'A'){
		$scope.title = 'Vouchers Ativos';
				
		$http({
		url: 'http://app.rjag.com.br/app-IOS/login-3.php', 
		method: "POST",
		params: {email: statesService.email, senha:statesService.senha, status:0}
		});
		
		statesService.setData();
		$scope.todos = statesService.getData();
		
		
	
	}else if($stateParams.voucherId == 'U'){
		
	$scope.title = 'Vouchers Utilizados';	
	
	$http({
		url: 'http://app.rjag.com.br/app-IOS/login-3.php', 
		method: "POST",
		params: {email: statesService.email, senha:statesService.senha, status:1}
		});
		
		statesService.setData();
		$scope.todos = statesService.getData();
	
	}
})

