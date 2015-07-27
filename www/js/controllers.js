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
* doRefresh: realiza o refresh dos vouchers, assim solicitando do banco
***********************************************************************************/
.controller('vouchersCtrl', function($scope, $stateParams, $timeout, statesService) {
	
	// responsavel por ordenar o refresh
	$scope.doRefresh = function() {
		statesService.getRefresh();
		$timeout(function() {
			statesService.setData();
			$scope.$broadcast('scroll.refreshComplete');	
		},4000);
	};
	
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
		$scope.show = function(todo) {
			if(todo == '0'){
				return true
			}
			
		};
		$scope.title = 'Vouchers Ativos';
		$scope.status = '0';		
		/*$http({
		url: 'http://app.rjag.com.br/app-IOS/login-3.php', 
		method: "POST",
		params: {email: statesService.email, senha:statesService.senha, status:0}
		});*/
		
		$scope.todos = statesService.getData();
		
		
	
	}else if($stateParams.voucherId == 'U'){
		
		$scope.title = 'Vouchers Utilizados';	
		$scope.status = '1';
		
		$scope.show = function(todo) {
			if(todo == '1'){
				return true
			}
			
		};	
	
		$scope.todos = statesService.getData();
	
	}
})

