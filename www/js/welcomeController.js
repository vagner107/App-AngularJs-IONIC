var serviceApp =  angular.module('starter.welcomeController', ['ionic']);



serviceApp.service('statesService', function($http, $timeout) {
	
	var senha;
	var email;
	var datas;
	this.setData = function(){ 
			$http.get('http://app.rjag.com.br/app-IOS/login.json')
			.then(function(res){
				datas = res.data;
			
			});
	  };
	  
	this.getData = function() {
		return datas;
		datas = '';
	};
  
});

/*
* Controller : WelcomeCtrl
* $ionicModal: Serviço para abilitar modal IONIC, exemplo : Login , Cadastro, Esqueci minha senha
* $timeout :  Serviço com metodos com temporizadores
* $state : Serviço utilizado na app para direcionar para paginas
* $ionicLoading : Serviço loading IONIC
* $ionicPopup : Serviço Popup IONIC (Alertas e Notificações)
* $http : Serviços para estabelecer acesso http.
*/
serviceApp.controller('WelcomeCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup, $http, statesService) {

//********************************************* LOGIN  ***********************************************// 

	// LOADING TIMER 3000 Ms
	$scope.show = function() {
		$ionicLoading.show({
		template: 'Aguarde...',
		noBackdrop : false,
		hideOnStateChange : false,
		duration : '3000'
	
		});
	};
	// LOADING TIMER 2000 Ms
	$scope.show1 = function() {
		$ionicLoading.show({
		template: 'Aguarde...',
		noBackdrop : false,
		hideOnStateChange : false,
		duration : '3000'
	
		});
	};
	// LOADING
	$scope.hide = function(){
		$ionicLoading.hide();
	};
	//ALERTA LOGIN
	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Email ou Login incorretos',
			template: 'Tente Novamente',
			delay : '4000',
			buttons: [
				{text: '<b>Ok</b>',
				type: 'button-energized'}]
		});
		alertPopup.then(function(res) {
			console.log('Obrigado por acessar');
		});
	};
   
	$scope.loginData = {};
		
	// CRIAR MODAL
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	})
	.then(function(modal) {
		$scope.modal = modal;
	});
	
	// FHECHAR MODAL
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};
	
	// ABRIR MODAL
	$scope.login = function() {
		$scope.modal.show();
	};

	$scope.doLogin = function() {
		//FAZ SOLICITAÇÃO PASSANDO DADOS VIA POST, QUE SEJA GERADO UM JSON  
		$http({
		url: 'http://app.rjag.com.br/app-IOS/login-3.php', 
		method: "POST",
		params: {email: $scope.loginData.username, senha:$scope.loginData.password}
		});
		statesService.email = $scope.loginData.username;
		statesService.senha = $scope.loginData.password;
		//CAPTURADO DADOS DO JSON
		statesService.setData();
		
		if(statesService.getData() > ''){	
			$timeout(function(){
				$scope.closeLogin();
				$scope.show1();
				$state.go('app.vouchers');
			}, 200); 
		}else{
			$scope.show1();	
			$timeout(function() {
				$scope.showAlert();
			}, 3000);
		}

	};

	$scope.logout = function() {
		$state.go('welcome');
	};
  
  
//********************************************* CADASTRO  ***********************************************// 
 
	$scope.cadastroData = {};

	$scope.showAlertCadastro = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Sua senha não é Segura',
		 template: 'Tente Novamente !',
		 delay : '4000',
		 buttons: [
      	{text: '<b>Ok</b>',
        type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};
	
	$scope.showAlertCadastroRealizado = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Cadastro Realizado com Êxito',
		 template: 'Lets Eat !!!!!',
		 delay : '4000',
	  	 buttons: [
      	{text: '<b>Ok</b>',
        type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};
 	
	
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
	if ($scope.cadastroData.password.length >= 6){  
		$scope.closeCadastro();
		$scope.show();
		$timeout(function() {
		  $scope.showAlertCadastroRealizado();
		}, 3000);
	
  }else{
	$scope.show();	
	$timeout(function() {
		$scope.showAlertCadastro();
	}, 3000);
	
	}
  };
  
//********************************************* RECUPERAR SENHA  ***********************************************//

	$scope.senhaData = {};
 
	$scope.showAlertSenhaEnviada = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Senha Enviada',
		 template: 'Aguarde o E-mail!',
		 delay : '4000',
		 buttons: [
      	{text: '<b>Ok</b>',
        type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};
	
	$scope.showAlertSenha = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Email Incorreto',
		 template: 'Tente Novamente',
		 delay : '4000',
	  	 buttons: [
      	{text: '<b>Ok</b>',
        type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};

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
	if ($scope.senhaData.email.length >= 9){  
		$scope.closeSenha();
		$scope.show();
		$timeout(function() {
		  $scope.showAlertSenhaEnviada();
		}, 3000);
	
  }else{
	$scope.show();	
	$timeout(function() {
		$scope.showAlertSenha();
	}, 3000);
	
	}
  };
  

});

