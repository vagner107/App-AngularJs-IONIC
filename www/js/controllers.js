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
    { title: 'Vouchers Ativos', status: 'A'},
    { title: 'Vouchers Inativos', status: 'I'},
  ];
})
/***********************************************************************************
* Controller : voucherCtrl
* $stateParams: Serviço utilizado para redirecionar parametros pela URL como um php
***********************************************************************************/
.controller('voucherCtrl', function($scope, $stateParams, $http) {
		
	if($stateParams.voucherId == 'A'){
	 
	$http.get('http://app.rjag.com.br/app-IOS/voucher_ativo.json')
       .then(function(res){
          $scope.todos = res.data;                
        });
	
	}else if($stateParams.voucherId == 'I'){
		
	$http.get('http://app.rjag.com.br/app-IOS/voucher_inativo.json')
       .then(function(res){
          $scope.todos = res.data;                
        });
	}
});
