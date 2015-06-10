angular.module('starter.controllers', ['ionic'])
/***********************************************************************************
* Controller : AppCtrl
* $ionicModal: Modulo para abilitar modal IONIC
* $timeout :  Modulo com metodos com temporizadores
* $state : Modulo utilizado na app para direcionar para paginas
***********************************************************************************/
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  
	$scope.logout = function() {
		$state.go('welcome');
	};
  
})
/***********************************************************************************
* Controller : vouchersCtrl
* $stateParams: Metodo utilizado para redirecionar parametros pela URL como um php
***********************************************************************************/
.controller('vouchersCtrl', function($scope, $stateParams) {

	var index = $stateParams[0];
    var anotherKey = $stateParams[1];

  $scope.vouchers = [
    { title: 'Ativo', id: 1, cod: 345 },
    { title: 'N Ativo', id: 2 },
  ];
})
/***********************************************************************************
* Controller : voucherCtrl
* $stateParams: Metodo utilizado para redirecionar parametros pela URL como um php
***********************************************************************************/
.controller('voucherCtrl', function($scope, $stateParams) {
   
});
